import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const trimmedValue = inputValue.trim();
    
    if (trimmedValue !== '') {
      onAdd(trimmedValue); 
      setInputValue('');  
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input 
        type="text"
        value={inputValue} 
        onChange={e => setInputValue(e.target.value)} 
        placeholder="Co masz do zrobienia?"
      />
      <button type='submit'>Dodaj</button>
    </form>
  );
}
