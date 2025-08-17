import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const StartEarningCTA = () => {
  const user = useAuth();

  return (
    <section className="py-16 px-4 md:px-10 xl:px-24 bg-gradient-to-br from-blue-400 via-blue-200 to-base-100">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Earn Coins for Real Work?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gray-800 text-xl mb-8"
        >
          Thousands of coins have already been claimed by our top workers. Start
          your journey now — either as a buyer or a worker.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link to={user ? "/dashboard/worker/task-list" : "/auth/login"}>
            <button className="btn btn-outline px-6 text-base font-semibold">
              Become a Worker
            </button>
          </Link>
          <Link to={user ? "/dashboard/buyer/add-task" : "/auth/login"}>
            <button className="btn btn-outline px-6 text-base font-semibold">
              Post a Task
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StartEarningCTA;
