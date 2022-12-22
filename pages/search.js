import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import SearchResults from '../services/SearchResults.json';
import InfoCard from '../components/InfoCard';
import MapBox from '../components/MapBox';

function Search({ searchResults }) {
  const router = useRouter();

  const { startDate, endDate, location, numOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy');

  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy');

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numOfGuests} Guests`} />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs text-gray-500'>300+ Stays - {range} - for {numOfGuests} number of Guests</p>

          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

          <div className='hidden lg:inline-flex lg:space-x-3 text-gray-800 whitespace-nowrap mb-5'>
            <p className='searchTap'>
              Cancellation Flexibility
            </p>

            <p className='searchTap'>
              Type of Place
            </p>

            <p className='searchTap'>
              Price
            </p>

            <p className='searchTap'>
              Room and Beds
            </p>

            <p className='searchTap'>
              More Filters
            </p>

          </div>

          <div className='flex flex-col space-y-10'>
            {searchResults?.map(item => (
              <InfoCard
                key={item.img}
                img={item.img}
                location={item.location}
                description={item.description}
                title={item.title}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>


        <section className='hidden xl:inline-flex xl:min-w-[600px]' >
          <MapBox searchResults={searchResults} />
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Search;


export async function getServerSideProps(context) {
  const searchResults = await SearchResults || fetch("https://www.jsonkeeper.com/b/5NPS").then(res => res.json());

  return {
    props: {
      searchResults,
    }
  }
}
