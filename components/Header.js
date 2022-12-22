import Image from "next/image";
import { Bars3Icon, GlobeAltIcon, MagnifyingGlassIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/solid'; import { useState } from "react";
;
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";


function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState(1);

  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const handleSelect = (date) => {
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
  }

  const resetInput = () => {
    setSearchInput("");
  }

  const search = () => {

    setSearchInput("");

    router.push({
      pathname: 'search',
      query: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
        location: searchInput.toString(),
      },
    });
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto ">
        <Image
          src='https://links.papareact.com/qd3'
          alt="logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* middle */}
      <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder ? placeholder : "Start your search"}
          className="flex-grow outline-none pl-5 bg-transparent text-sm text-gray-600 placeholder-gray-400"
        />
        <MagnifyingGlassIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-auto md:mx-2"
        />
      </div>

      {/* right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">
          Become a host
        </p>
        <GlobeAltIcon className="h-6" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>

      </div>

      {searchInput && (
        <div className="flex flex-col mx-auto col-span-3">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5861"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests:
            </h2>

            <UsersIcon className="h-5" />
            <input
              type="number"
              onChange={e => setNumOfGuests(e.target.value)}
              value={numOfGuests}
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={resetInput}
              className="flex-grow hover:bg-gray-200 p-2 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={search}
              className="flex-grow hover:bg-gray-200 p-2 rounded-md text-red-400"
            >
              Search
            </button>
          </div>
        </div>

      )}
    </header>
  )
}

export default Header;
