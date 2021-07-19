import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Food } from '../../types';
import React, { useState } from 'react';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food) => void;
}

export function ModalAddFood({
  handleAddFood,
  isOpen,
  setIsOpen,
}: ModalAddFoodProps) {
  const [values, setValues] = useState<Food>({
    available: true,
    description: '',
    id: 0,
    image: '',
    name: '',
    price: '',
  });

  const handleChange =
    (prop: keyof Food) => (event: React.ChangeEvent<{ value: unknown }>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  async function handleSubmit() {
    handleAddFood(values);
    setIsOpen();
    setValues({
      available: true,
      description: '',
      id: 0,
      image: '',
      name: '',
      price: '',
    });
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          name="image"
          value={values.image}
          onChange={handleChange('image')}
          placeholder="Cole o link aqui"
        />

        <Input
          name="name"
          value={values.name}
          onChange={handleChange('name')}
          placeholder="Ex: Moda Italiana"
        />
        <Input
          name="price"
          value={values.price}
          onChange={handleChange('price')}
          placeholder="Ex: 19.90"
        />

        <Input
          name="description"
          value={values.description}
          onChange={handleChange('description')}
          placeholder="Descrição"
        />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
