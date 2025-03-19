import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../../services/api';
import { toast } from 'react-toastify';

const CompletenessContext = createContext();

export const useCompleteness = () => useContext(CompletenessContext);

export const CompletenessProvider = ({ children }) => {
  const [isComplete, setIsComplete] = useState(false);

    const check = async () => {
        try {
            const result = await api.checkCompleteness();
            const complete = result.incomplete_types.length === 0 && result.properties_without_values.length === 0;
            setIsComplete(complete);
            if (complete) {
                toast.success("Все поля заполнены!");
            } else {
                toast.error("Не все поля заполнены!");
            }

        } catch (error) {
            console.error("Ошибка при проверке полноты:", error);
            toast.error("Ошибка при проверке полноты знаний!");
        }
    }

  return (
    <CompletenessContext.Provider value={{ isComplete, check }}>
      {children}
    </CompletenessContext.Provider>
  );
};