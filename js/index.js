// GitHub API endpoints
const USER_SEARCH_URL = 'https://api.github.com/search/users?q=';
const USER_REPOS_URL = 'https://api.github.com/users/';

// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const usersContainer = document.getElementById('users-container');
const reposContainer = document.getElementById('repos-container');

// Event listener for form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchUsers(searchTerm);
    }
});

// Function to search for users
async function searchUsers(username) {
    try {
        const response = await fetch(`${USER_SEARCH_URL}${username}`);
        const data = await response.json();
        displayUsers(data.items);
    } catch (error) {
        console.error('Error searching users:', error);
    }
}

// Function to display users
function displayUsers(users) {
    usersContainer.innerHTML = '';
    reposContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
            <h3>${user.login}</h3>
            <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        userElement.addEventListener('click', () => fetchUserRepos(user.login));
        usersContainer.appendChild(userElement);
    });
}

// Function to fetch user repositories
async function fetchUserRepos(username) {
    try {
        const response = await fetch(`${USER_REPOS_URL}${username}/repos`);
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching user repos:', error);
    }
}

// Function to display repositories
function displayRepos(repos) {
    reposContainer.innerHTML = '<h2>Repositories</h2>';
    repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo');
        repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        reposContainer.appendChild(repoElement);
    });
}
