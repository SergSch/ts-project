import React, { useEffect, useState } from 'react';
import {
  useLazyGetUsersReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api';
import { useDebounce } from '../customeHooks/debounce';
import RepoCard from '../components/RepoCard';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, data, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: isReposLoading, data: repos }] =
    useLazyGetUsersReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className=" flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className=" text-center text-red-600">Somthing went wrong!</p>
      )}
      <div className=" relative w-[560px]">
        <input
          type="text"
          className=" border py-2 px-4 w-full h-[42px] mb-2"
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className=" text-center">Loading ...</p>}
            {data?.map((elem) => (
              <li
                key={elem.id}
                onClick={() => clickHandler(elem.login)}
                className=" py-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {elem.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {isReposLoading && (
            <p className=" text-center">Repos are loading...</p>
          )}
          {repos?.map((elem) => (
            <RepoCard repo={elem} key={elem.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
