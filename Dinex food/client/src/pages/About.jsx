import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600 text-white py-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent)]" />

        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About DineX
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto"
          >
            We connect food lovers with the best restaurants around them.
            Fast delivery, amazing taste, and a delightful digital experience.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-9xl mt-10"
          >
            🍝
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              DineX is a modern food ordering platform designed to make your
              cravings disappear in minutes. We partner with top-rated local
              restaurants to bring quality meals straight to your doorstep.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our goal is simple — deliver happiness through food with a smooth,
              reliable, and enjoyable digital experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="text-[140px] animate-pulse">🍜</div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Our Mission",
              text: "To make food ordering effortless, fast, and enjoyable while supporting local restaurants and delivering exceptional dining experiences.",
            },
            {
              title: "Our Vision",
              text: "To become the most loved food delivery platform by continuously improving convenience, quality, and customer satisfaction.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-bold text-purple-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY PEOPLE LOVE DINEX */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-14"
          >
            Why People Love DineX
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Quick delivery you can rely on" },
              { icon: "🍔", title: "Wide Variety", desc: "Hundreds of restaurants & cuisines" },
              { icon: "🔒", title: "Secure Payments", desc: "Safe & trusted checkout process" },
              { icon: "💜", title: "Customer First", desc: "We value every single order" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center hover:shadow-xl transition"
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Restaurants" },
            { value: "50K+", label: "Happy Customers" },
            { value: "1M+", label: "Orders Delivered" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-purple-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Hungry Already?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-gray-600 mb-8"
        >
          Explore restaurants and order your favorite meals now.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/order-now")}
          className="px-10 py-4 bg-purple-600 text-white rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition"
        >
          Order Now
        </motion.button>
      </section>
    </div>
  );
};

export default About;
