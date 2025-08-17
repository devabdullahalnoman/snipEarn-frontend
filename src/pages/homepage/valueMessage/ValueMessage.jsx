import React from "react";
import { motion } from "motion/react";

const ValueMessage = () => {
  const values = [
    {
      icon: "💸",
      title: "Fair Payouts",
      text: "Coins are earned based on approved work — no fake promises, no delays.",
    },
    {
      icon: "🛡️",
      title: "Secure & Verified",
      text: "Admin monitors all withdrawals and submissions for platform integrity.",
    },
    {
      icon: "⚡",
      title: "Fast Workflow",
      text: "Post tasks, assign coins, review submissions — all in one dashboard.",
    },
    {
      icon: "📈",
      title: "Track Your Progress",
      text: "Buyers and workers have full access to history, coin logs, and approvals.",
    },
  ];

  return (
    <section className="py-20 px-4 lg:w-11/12 mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-medium mb-3"
        >
          Why Thousands Choose{" "}
          <span className="text-4xl md:text-5xl font-extrabold">snipEarn</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-xl"
        >
          Built for fairness, clarity, and real earning — Snipearn gives you
          control.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {values.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.5 }}
            className="bg-base-200 rounded-lg p-6 shadow-md hover:shadow-lg"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-lg">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValueMessage;
