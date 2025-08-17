import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop={true}
      speed={1000}
      direction="horizontal"
      className="w-full"
    >
      <SwiperSlide>
        <div className="w-full relative bg-[url('https://i.ibb.co/Tq7kkfPk/15742.jpg')] bg-cover bg-center h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center text-center px-4 h-full md:px-20 md:w-9/12 mx-auto">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl font-bold text-yellow-100 mb-4 xl:mb-6"
            >
              Earn Real Coins for Real Effort
            </motion.h1>
            <motion.p
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-white text-xl md:text-2xl xl:text-3xl"
            >
              Snipearn connects motivated workers with paid tasks posted by
              verified buyers.
            </motion.p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="w-full relative bg-[url('https://i.ibb.co/8nzFJk2R/16268.jpg')] bg-cover bg-center h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center text-center px-4 h-full md:px-20 md:w-9/12 mx-auto">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl font-bold text-yellow-100 mb-4 xl:mb-6"
            >
              Post Tasks, Set Coin Rewards
            </motion.h1>
            <motion.p
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-white text-xl md:text-2xl xl:text-3xl"
            >
              Buyers have full control over payouts, deadlines, and worker
              reviews — you run the show.
            </motion.p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="w-full relative bg-[url('https://i.ibb.co/tpPvjnwx/16039.jpg')] bg-cover bg-center h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-center text-center px-4 h-full md:px-20 md:w-9/12 mx-auto">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl font-bold text-yellow-100 mb-4 xl:mb-6"
            >
              Join. Submit. Earn Coins.
            </motion.h1>
            <motion.p
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-white text-xl md:text-2xl xl:text-3xl"
            >
              Thousands of coins already earned by our top workers — your chance
              starts now.
            </motion.p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
