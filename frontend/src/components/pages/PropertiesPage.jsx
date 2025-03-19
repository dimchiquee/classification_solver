import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [newProperty, setNewProperty] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
         const fetchProperties = async () => {
            try {
                const data = await api.getProperties();
                setProperties(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleAddProperty = async () => {
        if (newProperty.trim() === '') {
            setError("Введите название свойства!");
            return;
        }
        try {
            const addedProperty = await api.createProperty({ name: newProperty });
            setProperties([...properties, addedProperty]);
            setNewProperty('');
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        try {
            await api.deleteProperty(propertyId);
            setProperties(properties.filter(property => property.id !== propertyId));
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
            <h2>Свойства</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input
                type='text'
                value={newProperty}
                onChange={(e) => setNewProperty(e.target.value)}
                placeholder='Введите новое свойство'
            />
            <button onClick={handleAddProperty}>Добавить свойство</button>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        {property.name}
                        <button className="delete-btn" onClick={() => handleDeleteProperty(property.id)}> - </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertiesPage;