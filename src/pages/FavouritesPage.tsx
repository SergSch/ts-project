import React from 'react';
import { useAppSelector } from '../customeHooks/redux';

const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0) return <p>No items!</p>;

  return (
    <div className=" flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className=" list-none">
        {favourites?.map((elem) => (
          <li key={elem}>
            <a href={elem} target="_blank">
              {elem}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FavouritesPage;
