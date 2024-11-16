import forestImage from "../assets/images/forest.png";
import skyImage from "../assets/images/sky.png";
import houseImage from "../assets/images/house.png";

const posts = [
  {
    id: "1",
    title: "Ліс",
    image: forestImage,
    commentsCount: 10,
    location: "Ivano-Frankivs'k Region, Ukraine",
    coordinates: { latitude: 48.9226, longitude: 24.7111 },
  },
  {
    id: "2",
    title: "Захід на чорному морі",
    image: skyImage,
    commentsCount: 5,
    location: "Odessa, Ukraine",
    coordinates: { latitude: 46.4825, longitude: 30.7233 },
  },
  {
    id: "3",
    title: "Старий будиночок у Венеції",
    image: houseImage,
    commentsCount: 8,
    location: "Venice, Italy",
    coordinates: { latitude: 45.4408, longitude: 12.3155 },
  },
];

export default posts;
