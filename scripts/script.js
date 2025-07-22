let cid=1;

    const apiURL = 'http://localhost:3000/contacts';

    async function fetchContacts() {
      const res = await fetch(apiURL);
      const contacts = await res.json();
    //displayContacts(contacts);
    }

 async function fetchContactss() {
      const res = await fetch(apiURL);
      const contacts = await res.json();
    displayContacts(contacts);
    }



    async function addContact() {
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      if (!name || !phone) return alert('Please enter both name and phone.');

      await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, phone })
      });

      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      alert('Contact Saved Successfully!!')
            fetchContacts();
    }


    async function deleteContact(id) {
      await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
      fetchContacts();
      alert('contact deleted');
    }






    async function updateContact(id) {
            const newName = prompt('Enter new name:');
      const newPhone = prompt('Enter new phone:');
      if (!newName || !newPhone) return;

      await fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, phone: newPhone })
      });
alert("Contact updated successfully!!!!")
      // fetchContacts();
    }


    async function searchContact() {
      const query = document.getElementById('search').value.toLowerCase();
            if (!query) return alert('Please enter Name or Phone Number.');

      const res = await fetch(apiURL);
      const contacts = await res.json();
      const filtered = contacts.filter(
        c => c.name.toLowerCase().includes(query) || c.phone.includes(query)
      );
            displayContacts(filtered);
    }

 async function searchContactUpdate() {
      const query = document.getElementById('search').value.toLowerCase();
      if (!query) return alert('Please enter Name or Phone Number.');

      const res = await fetch(apiURL);
      const contacts = await res.json();
      const filtered = contacts.filter(
        c => c.name.toLowerCase().includes(query) || c.phone.includes(query)
      );
      displayContactUpdate(filtered);
    }


    function displayContactUpdate(contacts) {

      // document.getElementById("heading").style.visibility = "visible";
      const list = document.getElementById('contactList');
      list.innerHTML = '';
      contacts.forEach(c => {
        const li = document.createElement('li');
        li.className='list';
        li.textContent = `${c.name} - ${c.phone} `;
                li.innerHTML += `
          <button class='sub_button' onclick="updateContact('${c.id}')">Edit</button>
          <button class='sub_button' onclick="deleteContact('${c.id}')">Delete</button>
        `;
        list.appendChild(li);
      });
    }




    function displayContacts(contacts) {
              


      const list = document.getElementById('contactList');
      list.innerHTML = '';
      contacts.forEach(c => {
        const li = document.createElement('li');
        li.className='list';
        li.textContent = `${c.name} - ${c.phone} `;
        // li.innerHTML += `
        //   <button onclick="updateContact(${c.id})">Edit</button>
        //   <button onclick="deleteContact(${c.id})">Delete</button>
        // `;
        list.appendChild(li);
      });
      // const table = document.getElementById('contactTable');
      // table.innerHTML = '';
      // contacts.forEach(contact => {
      //   table.innerHTML += `
      //     <tr>
      //       <td>${contact.name}</td>
      //       <td>${contact.phone}</td>
            
      //     </tr>`;
      // });
    }

    fetchContacts(); // Load on page load
  