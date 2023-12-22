
import Banner from './Banner/Banner';
import UserDemographicsSection from './UserDemographicsSection/UserDemographicsSection';

const Home = () => {
    return (
        <div className='max-w-[1200px] mx-auto'>
      
           <Banner></Banner>
           <UserDemographicsSection></UserDemographicsSection>
        </div>
    );
};

export default Home;