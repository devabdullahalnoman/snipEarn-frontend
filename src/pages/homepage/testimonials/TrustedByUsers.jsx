import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "motion/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Farhan Hossain",
    photo: "https://i.ibb.co/ZRcQMKP3/5677.jpg",
    quote:
      "Got paid within hours! Snipearn’s approval system feels truly fair.",
  },
  {
    name: "Nusrat Jahan",
    photo: "https://i.ibb.co/SXCbt2Vq/13176.jpg",
    quote:
      "Posting tasks and reviewing work is effortless. Coins are fully traceable.",
  },
  {
    name: "Rezaul Karim",
    photo: "https://i.ibb.co/tTjsChyB/629.jpg",
    quote:
      "Withdrawals actually go through — admin approval gives me confidence.",
  },
  {
    name: "Taslima Akter",
    photo: "https://i.ibb.co/xKc5BwR5/896.jpg",
    quote: "It’s the first platform that feels legit in the microtask world.",
  },
  {
    name: "Tanvir Rahman",
    photo: "https://i.ibb.co/4w4ygn4r/17344.jpg",
    quote: "The coin dashboard is genius — I see every spend and earn clearly.",
  },
];

const TrustedByUsers = () => {
  return (
    <section className="pb-20 px-4 lg:w-11/12 mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-medium"
        >
          Trusted By Users Across Bangladesh
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-xl mt-4"
        >
          Snipearn empowers buyers and workers with secure, transparent earning.
        </motion.p>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        spaceBetween={24}
        className="pb-4"
      >
        {testimonials.map((user, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-base-200 p-6 rounded-lg shadow-md text-center h-60"
            >
              <img
                src={user.photo}
                alt={user.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-lg text-gray-400 mt-2 italic">
                “{user.quote}”
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrustedByUsers;
