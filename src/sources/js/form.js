const form = document.querySelector('form');
const result = document.querySelector('#result');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const fileInput = document.querySelector('#fileInput');
  const file = fileInput.files[0];

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      const organizations = {};

      results.data.forEach(function(row) {
        const orgName = row.organizacion;
        const userName = row.usuario;
        const role = row.rol;

        if (!organizations[orgName]) {
          organizations[orgName] = {
            organization: orgName,
            users: []
          };
        }

        const user = organizations[orgName].users.find(function(u) {
          return u.username === userName;
        });

        if (user) {
          user.roles.push(role);
        } else {
          organizations[orgName].users.push({
            username: userName,
            roles: [role]
          });
        }
      });

      result.textContent = JSON.stringify(Object.values(organizations), null, 8);
    }
  });
});
