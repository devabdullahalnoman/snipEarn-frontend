import React from "react";
import { motion } from "motion/react";

const HowDifferent = () => {
  return (
    <section className="pb-20 px-4 lg:w-11/12 mx-auto">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-medium"
        >
          How{" "}
          <span className="font-extrabold text-4xl md:text-5xl">snipEarn</span>{" "}
          Is Different
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-xl mt-4"
        >
          Unlike typical platforms, Snipearn gives you complete control,
          transparent logic, and verified earning. Here's how:
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg flex items-center gap-3"
        >
          <p className="text-xl">
            <span className="font-semibold">Role-based logic:</span> Every
            action — posting, approving, withdrawing — follows strict
            admin-verifiable roles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg flex items-start gap-3"
        >
          <p className="text-xl">
            <span className="font-semibold">Transparent coin flows:</span> Coins
            are logged across purchase, payout, and usage — no silent
            deductions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg flex items-start gap-3"
        >
          <p className="text-xl">
            <span className="font-semibold">Admin-reviewed submissions:</span>{" "}
            No auto-approvals — every task passes through a fair verification
            pipeline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg flex items-start gap-3"
        >
          <p className="text-xl">
            <span className="font-semibold">Secure withdrawal flow:</span>{" "}
            Workers request payouts, admins approve manually — all logged, all
            monitored.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowDifferent;
