const apiBase = 'http://localhost:3001/api/items';
const form = document.getElementById('item-form');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const itemIdInput = document.getElementById('item-id');
const itemList = document.getElementById('item-list');

async function loadItems() {
  const response = await fetch(apiBase);
  const items = await response.json();

  itemList.innerHTML = '';

  if (!items.length) {
    itemList.innerHTML = '<li>No items yet.</li>';
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.name}</strong>
      <div>${item.description}</div>
      <div class="actions">
        <button type="button" data-edit="${item.id}">Edit</button>
        <button type="button" class="secondary" data-delete="${item.id}">Delete</button>
      </div>
    `;
    fragment.appendChild(li);
  });

  itemList.appendChild(fragment);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: nameInput.value,
    description: descriptionInput.value
  };

  const id = itemIdInput.value;

  if (id) {
    await fetch(`${apiBase}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  form.reset();
  itemIdInput.value = '';
  await loadItems();
});

itemList.addEventListener('click', async (event) => {
  const target = event.target;

  if (target.matches('[data-edit]')) {
    const id = target.getAttribute('data-edit');
    const response = await fetch(`${apiBase}/${id}`);
    const item = await response.json();

    nameInput.value = item.name;
    descriptionInput.value = item.description;
    itemIdInput.value = item.id;
    return;
  }

  if (target.matches('[data-delete]')) {
    const id = target.getAttribute('data-delete');
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    await loadItems();
  }
});

loadItems();
