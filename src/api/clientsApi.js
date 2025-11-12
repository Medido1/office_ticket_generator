

export const deleteClient = async (id, setMessage, refreshData) => {
  const token = localStorage.getItem('authToken');

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