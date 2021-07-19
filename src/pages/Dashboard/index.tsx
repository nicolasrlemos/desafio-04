import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { Food as FoodList } from '../../types';

export function Dashboard() {
  const [foods, setFoods] = useState<FoodList[]>([]);
  const [editingFood, setEditingFood] = useState<FoodList>({
    id: 0,
    description: '',
    available: false,
    image: '',
    name: '',
    price: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    getFoods();
  }, []);

  async function handleAddFood(food: FoodList) {
    const foodList = [...foods];

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foodList, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodList) {
    const foodList = [...foods];
    const editedFood = { ...editingFood };

    try {
      const foodUpdated = await api.put(`/foods/${editedFood.id}`, {
        ...editedFood,
        ...food,
      });

      const foodsUpdated = foodList.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    const foodList = [...foods];

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foodList.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodList) {
    setEditingFood({ ...food });
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              available={food.available}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
