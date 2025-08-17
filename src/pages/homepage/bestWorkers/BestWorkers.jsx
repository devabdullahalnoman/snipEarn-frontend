import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import useFetchTopWorkersAPI from "../../../api/useFetchTopWorkersAPI";

const BestWorkers = () => {
  const { fetchTopWorkers } = useFetchTopWorkersAPI();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopWorkers().then((res) => {
      setWorkers(res.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <section className="pb-20 px-4 lg:w-11/12 mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-medium mb-3"
        >
          Best Workers on{" "}
          <span className="font-extrabold text-4xl md:text-5xl">snipEarn</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-xl"
        >
          These top earners prove that real work earns real coins.
        </motion.p>
      </div>

      <div>
        {loading ? (
          <p className="text-center text-red-600">Please wait.......</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workers.map((user, idx) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="bg-base-200 rounded-lg p-6 shadow-md hover:shadow-lg flex flex-col items-center"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="worker"
                  className="w-30 h-30 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">
                  {user.displayName || "Unnamed"}
                </h3>
                <p className="text-gray-400 mb-2">{user.email}</p>
                <div className="text-yellow-500 font-bold text-lg">
                  🪙 {user.coins ?? 0} Coins
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestWorkers;
