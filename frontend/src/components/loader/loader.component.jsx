import olympicLoader from '../../assets/olympic-athlete.json';
import Lottie from 'lottie-react';

const Loader = () => {
    return (
        <Lottie animationData={olympicLoader} loop={true} />
    );
}

export default Loader;