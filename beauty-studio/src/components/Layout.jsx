import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { services } from "../data/services";
import stephenType from "../assets/StephenType.otf";
import abramoRegular from "../assets/AbramoRegular.otf";
import forumRegular from "../assets/Forum-Regular.ttf";
import centuryExpandedRegular from "../assets/Century Expanded Regular.otf";

const navItems = [
  { to: "/", label: "За нас" },
  { to: "/salon", label: "Салон" },
  { to: "/technology", label: "Технология" },
  { to: "/offers", label: "Отстъпки" },
];

const galleryItem = { to: "/gallery", label: "Галерия" };

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;
  const mobileNavLinkClass = ({ isActive }) =>
    `mobile-nav-link${isActive ? " active" : ""}`;
  const ctaClass = ({ isActive }) => `nav-cta${isActive ? " active" : ""}`;
  const mobileCtaClass = ({ isActive }) =>
    `mobile-nav-cta${isActive ? " active" : ""}`;
  const isServicesPage = location.pathname.startsWith("/services");
  const isOffersPage = location.pathname === "/offers";
  const pageClass = isServicesPage ? "services-page" : "";
  const footerClass = `footer${isServicesPage ? " footer-services" : ""}${
    isOffersPage ? " footer-offers" : ""
  }`;
  const servicesActive = location.pathname.startsWith("/services/");
  const serviceLinks = services.map((service) => ({
    to: `/services/${service.id}`,
    label: service.title,
  }));

  return (
    <div className={`app ${pageClass}`}>
      <style>{`
        @font-face {
          font-family: 'Stephen Type';
          src: url(${stephenType}) format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Abramo';
          src: url(${abramoRegular}) format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Forum';
          src: url(${forumRegular}) format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Century Expanded';
          src: url(${centuryExpandedRegular}) format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        /* Основни стилове */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .app {
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          color: #2c3e50;
          line-height: 1.6;
          overflow-x: hidden;
          background: #fafafa;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 8px;
        }
        
        .section-padding {
          padding: 80px 0;
        }

        .page {
          padding-top: 0;
        }

        .page > section {
          padding-top: 120px;
        }
        
        /* Цвятова палитра */
        :root {
          --primary-dark: #1a472a;
          --primary-main: #2e7d32;
          --primary-light: #4caf50;
          --primary-lighter: #e8f5e9;
          --secondary-dark: #37474f;
          --text-dark: #263238;
          --text-light: #546e7a;
          --text-lighter: #90a4ae;
          --white: #ffffff;
          --gray-light: #f5f7fa;
          --gray-border: #e0e0e0;
          --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        
        /* Header */
        .header {
          background-image: linear-gradient(90deg, rgba(11, 26, 18, 0.75), rgba(11, 26, 18, 0.65)), url('/123.jpg');
          background-size: cover;
          background-position: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -48px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(11, 26, 18, 0.4) 0%, rgba(11, 26, 18, 0.2) 55%, rgba(11, 26, 18, 0) 100%);
          pointer-events: none;
        }
        
        .header.scrolled {
          box-shadow: var(--shadow);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          height: 80px;
        }
        
        /* Лого */
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        
        .logo-image {
          height: 144px;
          width: auto;
        }
        
        .logo-text {
          display: none;
        }
        
        /* Навигация */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 35px;
        }
        
        .nav-link {
          color: #f0f5f1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          position: relative;
          padding: 8px 14px;
          border-radius: 999px;
          transition: all 0.25s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .nav-link:after {
          content: none;
        }
        
        .nav-link:hover,
        .nav-link.active {
          color: #0f2b1d;
          background: rgba(245, 247, 250, 0.9);
        }

        .services-nav {
          position: relative;
          display: flex;
          align-items: center;
        }

        .services-trigger {
          background: none;
          border: none;
          cursor: pointer;
        }

        .services-trigger:after {
          content: '';
          display: inline-block;
          margin-left: 6px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid rgba(245, 247, 250, 0.9);
          transition: transform 0.2s ease;
        }

        .services-nav:hover .services-trigger:after,
        .services-nav:focus-within .services-trigger:after {
          transform: rotate(180deg);
          border-top-color: #0f2b1d;
        }

        .services-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          min-width: 280px;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 14px;
          padding: 10px;
          box-shadow: 0 18px 40px rgba(20, 54, 37, 0.2);
          border: 1px solid rgba(32, 77, 53, 0.12);
          display: flex;
          flex-direction: column;
          gap: 6px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 10;
        }

        .services-nav:hover .services-dropdown,
        .services-nav:focus-within .services-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .services-dropdown-link {
          display: block;
          padding: 10px 14px;
          border-radius: 10px;
          color: #0f2b1d;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .services-dropdown-link:hover,
        .services-dropdown-link.active {
          background: rgba(32, 77, 53, 0.12);
          color: #0f2b1d;
        }
        
        .nav-cta {
          background: rgba(245, 247, 250, 0.92);
          color: #0f2b1d;
          text-decoration: none;
          padding: 10px 22px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.25s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .nav-cta:hover,
        .nav-cta.active {
          background: rgba(255, 255, 255, 1);
          color: #0f2b1d;
        }
        
        /* Мобилно меню */
        .mobile-menu-btn {
          display: block;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--primary-dark);
          cursor: pointer;
          padding: 5px;
          transition: color 0.3s;
        }
        
        .mobile-menu-btn:hover {
          color: var(--primary-main);
        }
        
        .mobile-menu {
          background: var(--white);
          padding: 20px;
          animation: slideDown 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .mobile-nav-link {
          display: block;
          color: var(--text-dark);
          text-decoration: none;
          padding: 10px 12px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.25s ease;
        }
        
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #0f2b1d;
          background: rgba(76, 175, 80, 0.15);
        }

        .mobile-services-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: none;
          border: none;
          font-size: 15px;
          font-weight: 600;
          color: var(--text-dark);
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-services-trigger:hover {
          color: #0f2b1d;
          background: rgba(76, 175, 80, 0.15);
        }

        .mobile-services-trigger span:last-child {
          font-size: 12px;
          transform: rotate(0deg);
          transition: transform 0.2s ease;
        }

        .mobile-services-trigger.open span:last-child {
          transform: rotate(180deg);
        }

        .mobile-services-dropdown {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 6px 4px 8px;
        }

        .mobile-services-link {
          display: block;
          padding: 8px 14px;
          border-radius: 10px;
          text-decoration: none;
          color: #0f2b1d;
          font-size: 14px;
          font-weight: 600;
          background: rgba(76, 175, 80, 0.08);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .mobile-services-link:hover,
        .mobile-services-link.active {
          background: rgba(76, 175, 80, 0.18);
        }
        
        .mobile-nav-cta {
          display: block;
          background: #0f2b1d;
          color: var(--white);
          text-decoration: none;
          padding: 12px;
          text-align: center;
          font-weight: 600;
          margin-top: 15px;
          transition: all 0.25s ease;
          border: 1px solid #0f2b1d;
          border-radius: 12px;
        }
        
        .mobile-nav-cta:hover,
        .mobile-nav-cta.active {
          background: #143625;
          color: var(--white);
        }

        .page-transition {
          animation: pageFade 0.5s ease;
        }

        @keyframes pageFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* За нас секция - първа секция след header */
        .about-section {
          padding: 160px 0 80px;
          background: linear-gradient(135deg, var(--primary-lighter) 0%, var(--white) 100%);
        }

        .home-hero {
          position: relative;
          min-height: 100vh;
          background-image: url('/home-bg.jpg');
          background-size: cover;
          background-position: left center;
          display: flex;
          align-items: flex-start;
          padding-top: 5px;
        }

        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(13, 23, 17, 0.75) 0%, rgba(13, 23, 17, 0.5) 55%, rgba(13, 23, 17, 0.2) 100%);
        }

        .home-hero .container {
          position: relative;
          z-index: 1;
          max-width: 100%;
        }

        .home-hero .about-content {
          display: flex;
          justify-content: flex-end;
          padding-right: clamp(80px, 10vw, 240px);
        }

        .home-hero .about-text {
          background: rgba(10, 20, 15, 0.6);
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: var(--shadow-hover);
          text-align: center;
          max-width: 700px;
          width: min(700px, 92vw);
          margin-left: auto;
          margin-right: 0;
          margin-top: 110px;
          padding-right: 0;
        }

        .hero-logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: -50px;
          margin-top: -70px;
        }

        .hero-logo {
          width: min(420px, 78vw);
          height: auto;
          display: block;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.35));
        }

        .home-hero .about-text h1,
        .home-hero .about-text p {
          color: #f5f7fa;
        }

        .home-hero .about-text p {
          font-size: 16px;
          line-height: 1.7;
          letter-spacing: 0.01em;
          max-width: 60ch;
          margin-left: auto;
          margin-right: auto;
          text-align: justify;
        }

        .home-hero .highlight {
          color: #d2ffdf;
        }

        .hero-title {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.1;
        }

        .hero-line {
          display: block;
        }

        .hero-line-desislava {
          font-family: 'Stephen Type', 'Montserrat', 'Segoe UI', sans-serif;
          font-size: clamp(34px, 6vw, 64px);
        }

        .hero-line-studio {
          font-family: 'Forum', 'Montserrat', 'Segoe UI', sans-serif;
          font-size: clamp(28px, 4.5vw, 48px);
          letter-spacing: 0.12em;
        }

        .hero-line-facebody,
        .hero-line-perfection {
          font-family: 'Century Expanded', 'Montserrat', 'Segoe UI', sans-serif;
          font-size: clamp(18px, 2.8vw, 28px);
        }

        .hero-line-facebody {
          letter-spacing: 0.255em;
        }

        .hero-line-perfection {
          letter-spacing: 0.261em;
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        
        .about-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .about-logo-large {
          max-width: 400px;
          width: 100%;
          border-radius: 8px;
          box-shadow: var(--shadow-hover);
        }
        
        .about-text {
          text-align: center;
        }
        
        .about-text h1 {
          font-size: 36px;
          font-weight: 700;
          color: var(--primary-dark);
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .about-text p {
          font-size: 16px;
          color: var(--text-light);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        
        .highlight {
          color: var(--primary-main);
          font-weight: 600;
        }
        
        /* Медиа заявки */
        @media (min-width: 768px) {
          .about-content {
            grid-template-columns: 1fr 2fr;
            text-align: right;
          }
          
          .about-logo-large {
            max-width: 350px;
          }
          
          .about-text h1 {
            font-size: 40px;
            text-align: right;
          }
          
          .about-text p {
            text-align: right;
          }
        }
        
        @media (min-width: 1024px) {
          .about-text h1 {
            font-size: 42px;
          }
          
          .about-logo-large {
            max-width: 400px;
          }
        }
        
        /* Салон секция */
        .salon-section {
          padding: 80px 0;
          background: var(--white);
        }

        .salon-bg {
          background-image: linear-gradient(180deg, rgba(10, 20, 15, 0.55), rgba(10, 20, 15, 0.45)), url('/salon.png');
          background-size: cover;
          background-position: center;
          min-height: 110vh;
        }
        
        .salon-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 140px;
          align-items: center;
          justify-items: center;
          padding-top: 40px;
        }

        .salon-text {
          background: rgba(10, 20, 15, 0.48);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 48px 48px;
          box-shadow: var(--shadow-hover);
          text-align: center;
          color: #f5f7fa;
          max-width: 980px;
          width: 110%;
          margin-top: 8px;
        }

        .salon-text h2 {
          color: #f5f7fa;
        }

        .salon-text p {
          color: #f5f7fa;
          font-size: 16px;
          line-height: 1.7;
          letter-spacing: 0.01em;
          max-width: 60ch;
          margin-left: auto;
          margin-right: auto;
          text-align: justify;
        }

        .salon-image {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow);
          width: 130%;
        }
        
        .salon-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .salon-text h2 {
          font-size: 32px;
          color: #f5f7fa;
          margin-bottom: 28px;
          font-weight: 700;
        }
        
        .salon-text p {
          font-size: 16px;
          color: #f5f7fa;
          line-height: 1.7;
        }
        
        /* Услуги секция */
        .services-section {
          padding: 80px 0;
          background: var(--gray-light);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        
        .section-header h2 {
          font-size: 32px;
          color: var(--primary-dark);
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .section-header p {
          font-size: 16px;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Услуги грид */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 25px;
        }
        
        .service-card {
          background: var(--white);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          border: 1px solid var(--gray-border);
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .service-header {
          background: var(--primary-main);
          color: var(--white);
          padding: 25px;
          position: relative;
        }
        
        .service-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        
        .service-body {
          padding: 25px;
        }
        
        .service-description {
          color: var(--text-dark);
          margin-bottom: 20px;
          font-size: 15px;
          line-height: 1.7;
        }
        
        .service-details {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }
        
        .service-details li {
          padding: 8px 0;
          color: var(--text-light);
          position: relative;
          padding-left: 25px;
          font-size: 14px;
        }
        
        .service-details li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--primary-main);
          font-weight: bold;
          font-size: 14px;
        }

        .service-detail {
          padding: 120px 0 80px;
          background-image: linear-gradient(180deg, rgba(10, 20, 15, 0.65), rgba(10, 20, 15, 0.55)), url('/uslugi.png');
          background-size: cover;
          background-position: center;
        }

        .service-detail .container {
          max-width: 1280px;
        }

        .service-detail-card {
          background: rgba(10, 20, 15, 0.56);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 40px 36px;
          color: #f5f7fa;
          box-shadow: var(--shadow-hover);
          text-align: left;
          max-width: 860px;
          width: min(860px, 94%);
          margin-left: auto;
          margin-right: 0;
        }

        .service-detail-header h2 {
          font-size: 30px;
          margin-bottom: 10px;
          text-align: center;
        }

        .service-detail-header p {
          text-align: center;
          color: #dfe9e3;
          margin-bottom: 24px;
        }

        .service-detail-body ul {
          list-style: none;
          padding: 0;
          margin: 0 0 26px;
        }

        .service-detail-body li {
          padding: 10px 0;
          position: relative;
          padding-left: 24px;
          color: #e3eee7;
          font-size: 15px;
          line-height: 1.6;
        }

        .service-detail-body li:before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 14px;
          height: 18px;
          background: radial-gradient(circle at 30% 28%, #6fbe89 0%, #2f8a54 40%, #1a5a3b 75%, #13442e 100%);
          -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 32'%3E%3Cpath d='M12 1C12 1 3 12.5 3 19.2C3 26 7.9 31 12 31C16.1 31 21 26 21 19.2C21 12.5 12 1 12 1Z'/%3E%3C/svg%3E") center / contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 32'%3E%3Cpath d='M12 1C12 1 3 12.5 3 19.2C3 26 7.9 31 12 31C16.1 31 21 26 21 19.2C21 12.5 12 1 12 1Z'/%3E%3C/svg%3E") center / contain no-repeat;
          box-shadow: 0 2px 6px rgba(31, 106, 69, 0.45);
        }

        .service-back-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.6px;
          color: #0f2b1d;
          background: rgba(245, 247, 250, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease;
        }

        .service-back-link:hover {
          background: #ffffff;
          color: #0f2b1d;
        }
        
        /* Технология секция */
        .technology-section {
          padding: 80px 0;
          background-image: url('/fonsupernova.png');
          background-size: cover;
          background-position: center;
          min-height: 110vh;
        }

        .technology-bg {
          background-attachment: scroll;
        }

        .tech-copy {
          background: rgba(10, 20, 15, 0.68);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(20, 54, 37, 0.2);
          overflow: hidden;
        }

        .technology-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 26px;
          align-items: start;
          max-width: 920px;
          margin: 0 auto;
        }

        .tech-video-card {
          padding: 0;
          display: flex;
          justify-content: center;
          width: fit-content;
          max-width: none;
          background: transparent;
          border: none;
          box-shadow: none;
          overflow: visible;
        }

        .tech-video-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          padding: 12px 26px;
          border-radius: 999px;
          background: rgba(245, 247, 250, 0.92);
          color: #0f2b1d;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.6px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          transition: all 0.2s ease;
        }

        .tech-video-link:hover {
          background: #ffffff;
          color: #0f2b1d;
        }

        .tech-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }

        .tech-copy {
          padding: 20px 22px;
          width: 100%;
          max-width: 700px;
          margin-top: 96px;
        }

        .tech-summary {
          color: #e1ebe6;
          font-size: 16px;
          line-height: 1.8;
          margin: 0;
          max-width: none;
          text-align: justify;
        }
        
        /* Отстъпки секция */
        .offers-section {
          padding: 120px 0 80px;
          background-image: url('/otstupkiback.png');
          background-size: cover;
          background-position: center 22%;
          background-repeat: no-repeat;
          min-height: 100vh;
        }

        .offers-section .container {
          max-width: 1320px;
        }
        
        .offers-grid {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: flex-start;
          justify-content: center;
          gap: 28px;
          margin-top: 174px;
        }
        
        .offer-item {
          width: min(460px, 45vw);
          height: min(460px, 45vw);
          border: 0;
          padding: 0;
          margin: 0;
          display: block;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 34px rgba(20, 54, 37, 0.2);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          background: transparent;
          cursor: pointer;
        }
        
        .offer-item:hover {
          transform: translateY(-4px);
        }

        .offer-item:focus-visible {
          outline: 3px solid rgba(32, 77, 53, 0.45);
          outline-offset: 4px;
        }

        .offer-item.expanded {
          transform: translateY(-4px) scale(1.04);
          z-index: 2;
          box-shadow: 0 20px 44px rgba(20, 54, 37, 0.28);
        }
        
        .offer-image-container {
          width: 100%;
          height: 100%;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }
        
        .offer-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.28s ease;
        }

        .offer-item.expanded img {
          transform: scale(1.03);
        }
        
        /* Галерия секция */
        .gallery-section {
          padding: 80px 0;
          background-image: url('/galleryback.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: left center;
          min-height: 100vh;
        }

        .gallery-bg {
          background-attachment: scroll;
        }

        .gallery-section .container {
          max-width: 1920px;
          padding: 0;
        }

        .gallery-stage {
          position: relative;
          width: 100%;
          min-height: clamp(520px, 72vh, 860px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-target {
          position: relative;
          width: min(80vw, 420px);
          aspect-ratio: 1 / 1;
          margin: 0;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
        }

        .gallery-photo-shell {
          position: relative;
          width: var(--frame-width, 100%);
          height: var(--frame-height, 100%);
          border-radius: 16px;
          overflow: hidden;
          background: rgba(7, 16, 12, 0.38);
          box-shadow: 0 26px 46px rgba(4, 12, 9, 0.5), 0 8px 20px rgba(0, 0, 0, 0.32);
        }

        .gallery-photo-shell::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          z-index: 1;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
          background:
            linear-gradient(#dce8e1, #dce8e1) left 14px top 14px / 34px 2px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) left 14px top 14px / 2px 34px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) right 14px top 14px / 34px 2px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) right 14px top 14px / 2px 34px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) left 14px bottom 14px / 34px 2px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) left 14px bottom 14px / 2px 34px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) right 14px bottom 14px / 34px 2px no-repeat,
            linear-gradient(#dce8e1, #dce8e1) right 14px bottom 14px / 2px 34px no-repeat;
        }

        .gallery-photo {
          width: 100%;
          height: 100%;
          object-fit: var(--photo-fit, cover);
          object-position: var(--photo-pos-x, 50%) var(--photo-pos-y, 50%);
          display: block;
          transform: scale(var(--photo-scale, 1));
          transition: transform 0.25s ease;
        }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(245, 247, 250, 0.92);
          color: #0f2b1d;
          font-size: 30px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
          user-select: none;
          z-index: 3;
        }

        .gallery-nav:hover {
          transform: translateY(-51%);
          background: #ffffff;
        }

        .gallery-nav-prev {
          left: 12px;
        }

        .gallery-nav-next {
          right: 12px;
        }

        @media (max-width: 767px) {
          .gallery-section {
            background-position: center top;
            padding: 56px 0 40px;
          }

          .gallery-stage {
            min-height: clamp(420px, 62vh, 620px);
          }

          .gallery-target {
            width: min(90vw, 360px);
          }

          .gallery-nav {
            width: 42px;
            height: 42px;
            font-size: 26px;
          }

          .gallery-nav-prev {
            left: 8px;
          }

          .gallery-nav-next {
            right: 8px;
          }
        }
        
        /* Контакти секция */
        .contact-section {
          padding: 80px 0;
          background-image: linear-gradient(180deg, rgba(10, 20, 15, 0.66), rgba(10, 20, 15, 0.56)), url('/salon.png');
          background-size: cover;
          background-position: center;
          min-height: 110vh;
        }

        .contact-bg {
          background-attachment: scroll;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 26px;
          align-items: start;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        
        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px 22px;
          background: rgba(10, 20, 15, 0.68);
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(20, 54, 37, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-left: 1px solid rgba(255, 255, 255, 0.14);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        
        .contact-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(20, 54, 37, 0.28);
          border-color: rgba(255, 255, 255, 0.24);
        }
        
        .contact-item h3 {
          margin: 0;
          color: #f5f7fa;
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .contact-item h3:before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #7fd19d;
          border-radius: 50%;
        }
        
        .contact-details {
          color: #e3eee7;
          font-size: 15px;
        }

        .contact-details p {
          margin: 0;
        }

        .contact-details p + p {
          margin-top: 4px;
        }

        .contact-intro .contact-details p {
          line-height: 1.7;
        }
        
        .phone-link {
          color: #d9ffe6;
          text-decoration: none;
          font-weight: 600;
          font-size: 20px;
          display: inline-block;
          margin-top: 5px;
          transition: color 0.3s;
          border-bottom: 2px solid transparent;
        }
        
        .phone-link:hover {
          color: #f5fffa;
          border-bottom: 2px solid #a5f2c1;
        }
        
        .work-hours {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        
        .work-hours span {
          display: block;
          font-size: 15px;
          color: #e3eee7;
        }
        
        .map-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .map-header {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
        }
        
        .map-header h3 {
          color: #f5f7fa;
          font-size: 22px;
          margin: 0 0 4px;
          font-weight: 600;
          text-align: center;
          justify-content: center;
        }

        .map-header h3:before {
          display: none;
        }
        
        .map-header p {
          color: #dce8e1;
          font-size: 15px;
          text-align: center;
          margin: 0;
        }
        
        .map-container-large {
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-hover);
          height: 420px;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }
        
        .map-container-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        /* Футър */
        .footer {
          background: #143625;
          color: var(--white);
          padding: 36px 0 14px;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: -40px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(20, 54, 37, 0) 0%, rgba(20, 54, 37, 0.35) 45%, #143625 100%);
        }

        .footer.footer-services {
          background: #46514f;
        }

        .footer.footer-services::before {
          background: linear-gradient(to bottom, rgba(70, 81, 79, 0) 0%, rgba(70, 81, 79, 0.35) 45%, #46514f 100%);
        }

        .footer.footer-offers {
          background: #5d6489;
        }

        .footer.footer-offers::before {
          background: linear-gradient(to bottom, rgba(93, 100, 137, 0) 0%, rgba(93, 100, 137, 0.35) 45%, #5d6489 100%);
        }
        
        .footer-content {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .footer-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 0;
        }

        .footer-logo img {
          width: min(260px, 72vw);
          height: auto;
          display: block;
        }
        
        .footer-tagline {
          font-size: 11px;
          color: var(--primary-light);
          margin-bottom: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        
        .footer-info {
          color: #b0bec5;
          font-size: 14.5px;
          line-height: 1.7;
          margin-bottom: 12px;
          max-width: 420px;
          margin-left: 0;
          margin-right: 0;
        }
        
        .footer-bottom {
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #90a4ae;
          font-size: 12px;
          width: 100%;
          text-align: center;
        }

        .footer-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (max-width: 768px) {
            .home-hero .about-content {
               padding-right: 0;
             }
        }
        
        /* Медиа заявки */
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
          
          .mobile-menu-btn {
            display: none;
          }
          
          .container {
             padding: 0px;
          }
          
          .about-content {
            grid-template-columns: 1fr 2fr;
            text-align: right;
            padding-right: 0;
          }

          .about-image {
            max-width: 250px;
          }
          
          .about-text h1 {
            font-size: 40px;
            text-align: right;
          }
          
          .about-text p {
            text-align: right;
          }
          
          .salon-content {
            grid-template-columns: 1fr 1fr;
          }

          .service-detail-card {
            transform: translateX(178px);
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .technology-layout {
            grid-template-columns: 1fr;
            gap: 28px;
            align-items: start;
            max-width: 1100px;
          }

          .tech-right {
            min-height: 560px;
          }

          .tech-video-card {
            position: absolute;
            top: 118px;
            right: -12px;
            padding: 0;
          }

          .tech-copy {
            margin-top: 255px;
            margin-left: -110px;
            max-width: 660px;
          }
          
          .offers-grid {
            gap: 34px;
          }
          
          .gallery-stage {
            min-height: clamp(620px, 80vh, 980px);
          }

          .gallery-target {
            width: min(58vw, 560px);
          }

          .gallery-nav-prev {
            left: 12px;
          }

          .gallery-nav-next {
            right: 12px;
          }
          
          .contact-content {
            grid-template-columns: 1fr 1fr;
            gap: 34px;
          }

          .map-section {
            margin-top: 0;
          }
          
          .map-header h3 {
            text-align: center;
          }
          
          .map-header p {
            text-align: center;
          }
          
          .map-container-large {
            height: 500px;
          }
        }
        
        @media (min-width: 1024px) {
          .about-text h1 {
            font-size: 42px;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .offers-grid {
            gap: 38px;
          }

          .gallery-target {
            width: min(48vw, 640px);
          }
          
          .map-container-large {
            height: 550px;
          }
        }
      `}</style>

      <header className={`header${isScrolled ? " scrolled" : ""}`} id="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <img
              src="/textlogo.png"
              alt="Desi Slava Studio"
              className="logo-image"
            />
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end>
                {item.label}
              </NavLink>
            ))}
            <div className="services-nav">
              <NavLink
                to={serviceLinks[0]?.to || "/services/epilation"}
                className={({ isActive }) =>
                  `nav-link services-trigger${
                    servicesActive || isActive ? " active" : ""
                  }`
                }
                end
              >
                Услуги
              </NavLink>
              <div
                className="services-dropdown"
                role="menu"
                aria-label="Услуги"
              >
                {serviceLinks.map((service) => (
                  <NavLink
                    key={service.to}
                    to={service.to}
                    className={({ isActive }) =>
                      `services-dropdown-link${isActive ? " active" : ""}`
                    }
                  >
                    {service.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <NavLink to={galleryItem.to} className={navLinkClass} end>
              {galleryItem.label}
            </NavLink>
            <NavLink to="/contact" className={ctaClass}>
              Запиши час
            </NavLink>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Меню"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={mobileNavLinkClass}
                end
              >
                {item.label}
              </NavLink>
            ))}
            <button
              className={`mobile-services-trigger${
                isServicesOpen ? " open" : ""
              }`}
              onClick={() => setIsServicesOpen((open) => !open)}
              aria-expanded={isServicesOpen}
              type="button"
            >
              <span>Услуги</span>
              <span>▾</span>
            </button>
            {isServicesOpen && (
              <div className="mobile-services-dropdown">
                {serviceLinks.map((service) => (
                  <NavLink
                    key={service.to}
                    to={service.to}
                    className={({ isActive }) =>
                      `mobile-services-link${isActive ? " active" : ""}`
                    }
                  >
                    {service.label}
                  </NavLink>
                ))}
              </div>
            )}
            <NavLink to={galleryItem.to} className={mobileNavLinkClass} end>
              {galleryItem.label}
            </NavLink>
            <NavLink to="/contact" className={mobileCtaClass}>
              Запиши час
            </NavLink>
          </div>
        )}
      </header>

      <main>
        <div className="page-transition" key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <footer className={footerClass}>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/textlogo.png" alt="Desi Slava Studio" />
            </div>
            <div className="footer-text">
              <p className="footer-info">
                Професионални козметични процедури с внимание към всеки детайл и
                индивидуален подход. Работим с модерна технология и безопасни
                методи, за да постигнем естествени и трайни резултати.
              </p>
            </div>

            <div className="footer-bottom">
              © {new Date().getFullYear()} Desi Slava Studio. Всички права
              запазени.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
