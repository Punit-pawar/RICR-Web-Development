import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-400 to-purple-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About DineX
          </h1>
          <p className="text-lg md:text-xl text-purple-50 max-w-3xl mx-auto">
            We connect food lovers with the best restaurants around them.
            Fast delivery, amazing taste, and a delightful ordering experience.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
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
          </div>

          <div className="flex justify-center">
            <div className="text-9xl">🍽️</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To make food ordering effortless, fast, and enjoyable while
              supporting local restaurants and providing customers with
              exceptional dining experiences at home.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become the most loved food delivery platform by continuously
              improving convenience, quality, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why People Love DineX
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Quick delivery you can rely on",
              },
              {
                icon: "🍔",
                title: "Wide Variety",
                desc: "Hundreds of restaurants & cuisines",
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "Safe & trusted checkout process",
              },
              {
                icon: "💜",
                title: "Customer First",
                desc: "We value every single order",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition"
              >
                <span className="text-5xl block mb-3">{item.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="text-purple-100">Restaurants</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50K+</p>
            <p className="text-purple-100">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1M+</p>
            <p className="text-purple-100">Orders Delivered</p>
          </div>
          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p className="text-purple-100">Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Hungry Already?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore restaurants and order your favorite meals now.
          </p>
          <button
            onClick={() => navigate("/order-now")}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            Order Now
          </button>
        </div>
      </section>
    </>
  );
};

export default About;
