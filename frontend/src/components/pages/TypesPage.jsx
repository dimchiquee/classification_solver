import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';

const TypesPage = () => {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await api.getTypes();
        setTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  const handleAddType = async () => {
    if (newType.trim() === '') {
        setError("Введите название типа!");
        return;
    }
    try {
      const addedType = await api.createType({ name: newType });
      setTypes([...types, addedType]);
      setNewType('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteType = async (typeId) => {
    try {
      await api.deleteType(typeId);
      setTypes(types.filter(type => type.id !== typeId));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>Типы предметов</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <input
        type="text"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        placeholder="Введите новый тип"
      />
      <button onClick={handleAddType}>Добавить тип</button>
      <ul>
        {types.map((type) => (
          <li key={type.id}>
            {type.name}
            <button className="delete-btn" onClick={() => handleDeleteType(type.id)}> - </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypesPage;