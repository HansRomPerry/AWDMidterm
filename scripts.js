function addItem() {
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const rating = document.getElementById('rating').value;
    const imageUrl = document.getElementById('image').value;

    const section = document.getElementById(category);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Rating: ${rating}</p>
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
        <button class="remove-btn" onclick="removeItem(this)">Remove</button>
    `;
    section.appendChild(card);

    const item = { title, description, rating, imageUrl };
    const storedItems = JSON.parse(localStorage.getItem(category)) || [];
    storedItems.push(item);
    localStorage.setItem(category, JSON.stringify(storedItems));

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('image').value = '';
}

function removeItem(btn) {
    const card = btn.parentElement;
    const category = card.parentElement.id;
    const storedItems = JSON.parse(localStorage.getItem(category)) || [];
    
    const index = Array.from(card.parentElement.children).indexOf(card);
    
    storedItems.splice(index, 1);

    localStorage.setItem(category, JSON.stringify(storedItems));

    card.remove();
}

window.onload = function () {
    ['games', 'movies', 'shows'].forEach(category => {
        const storedItems = JSON.parse(localStorage.getItem(category)) || [];
        const section = document.getElementById(category);
        storedItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>Rating: ${item.rating}</p>
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}">` : ''}
                <button class="remove-btn" onclick="removeItem(this)">Remove</button>
            `;
            section.appendChild(card);
        });
    });
};  