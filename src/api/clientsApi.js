const token = localStorage.getItem('authToken');

export const deleteClient = async (id, setMessage, refreshData) => {
  if (!token) {
    console.error('No auth token found');
    return;
  }

  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
    try {
      const res = await fetch(`http://localhost:8000/clients/${id}/delete`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "'Erreur lors de la suppression'");
        return;
      }
      
      setMessage(data.message);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  }
};

export const updateClient = async(id, setMessage, refreshData) => {
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/clients/${id}/update`,{
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "'Erreur lors de la suppression'");
      return;
    }
    
    setMessage(data.message);
    refreshData();
  } catch (error) {
    console.error(error);
  }
};