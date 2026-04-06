import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useRef } from "react";
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
const pricesItem = { to: "/prices", label: "Ценоразпис" };
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61586497495857&locale=bg_BG",
  instagram: "https://www.instagram.com/desislavastudio/",
};

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopServicesRef = useRef(null);
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
    setIsDesktopServicesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!desktopServicesRef.current?.contains(event.target)) {
        setIsDesktopServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;
  const mobileNavLinkClass = ({ isActive }) =>
    `mobile-nav-link${isActive ? " active" : ""}`;
  const ctaClass = ({ isActive }) => `nav-cta${isActive ? " active" : ""}`;
  const mobileCtaClass = ({ isActive }) =>
    `mobile-nav-cta${isActive ? " active" : ""}`;
  const isServicesPage = location.pathname.startsWith("/services");
  const isPriceListPage = location.pathname === "/prices";
  const isOffersPage = location.pathname === "/offers";
  const isGalleryPage = location.pathname === "/gallery";
  const isTechnologyPage = location.pathname === "/technology";
  const pageClass = isServicesPage ? "services-page" : "";
  const footerClass = `footer${(isServicesPage || isPriceListPage) ? " footer-services" : ""}${
    isOffersPage ? " footer-offers" : ""
  }${isGalleryPage ? " footer-gallery" : ""}${
    isTechnologyPage ? " footer-technology" : ""
  }`;
  const servicesActive = location.pathname.startsWith("/services/");
  const serviceLinks = services.map((service) => ({
    to: `/services/${service.id}`,
    label: service.title,
  }));
  const closeServiceMenus = () => {
    setIsServicesOpen(false);
    setIsDesktopServicesOpen(false);
    setIsMenuOpen(false);
  };

  const handleDesktopServicesBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDesktopServicesOpen(false);
    }
  };

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

        .services-nav.open .services-trigger:after {
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

        .services-nav.open .services-dropdown {
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
          width: min(100%, 700px);
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
          gap: clamp(36px, 7vw, 140px);
          align-items: center;
          justify-items: center;
          width: 100%;
          padding-top: clamp(28px, 4vw, 56px);
        }

        .salon-text {
          background: rgba(10, 20, 15, 0.48);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: clamp(28px, 4vw, 48px);
          box-shadow: var(--shadow-hover);
          text-align: center;
          color: #f5f7fa;
          max-width: 980px;
          width: min(100%, 980px);
          margin-top: 0;
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
          width: min(100%, 860px);
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

        /* Ценоразпис секция */
        .pricelist-section {
          padding: 104px 0 64px;
          background-image: linear-gradient(180deg, rgba(10, 20, 15, 0.72), rgba(10, 20, 15, 0.6)), url('/uslugi.png');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
        }

        .pricelist-section .container {
          max-width: 1320px;
        }

        .pricelist-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          margin-bottom: 20px;
        }

        .pricelist-intro,
        .pricelist-note,
        .pricelist-card,
        .pricelist-cta {
          background: rgba(10, 20, 15, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 16px;
          box-shadow: var(--shadow-hover);
        }

        .pricelist-intro {
          padding: clamp(22px, 3vw, 32px);
          color: #f5f7fa;
        }

        .pricelist-intro h1 {
          font-size: clamp(30px, 4.4vw, 44px);
          line-height: 1.05;
          margin-bottom: 12px;
          text-align: center;
        }

        .pricelist-intro p,
        .pricelist-note p,
        .pricelist-card-head p,
        .pricelist-row-copy p,
        .pricelist-cta p {
          color: #dfe9e3;
          line-height: 1.7;
        }

        .pricelist-note {
          padding: clamp(20px, 2.6vw, 28px);
          color: #f5f7fa;
        }

        .pricelist-note h2 {
          font-size: clamp(30px, 4.4vw, 44px);
          line-height: 1.05;
          margin-bottom: 12px;
          text-align: center;
        }

        .pricelist-note-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        .pricelist-note-list li {
          position: relative;
          padding-left: 22px;
          color: #e4eee7;
          line-height: 1.6;
        }

        .pricelist-note-highlight-line {
          display: block;
          font-size: clamp(16px, 1.7vw, 21px);
          font-weight: 700;
          line-height: 1.45;
          color: #f8fbf9;
        }

        .pricelist-note-highlight-line + .pricelist-note-highlight-line {
          margin-top: 4px;
        }

        .pricelist-note-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #d7e7dd;
          box-shadow: 0 0 0 4px rgba(215, 231, 221, 0.12);
        }

        .pricelist-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          align-items: start;
        }

        .pricelist-column {
          display: grid;
          gap: 18px;
          align-content: start;
        }

        .pricelist-card {
          padding: clamp(18px, 2.5vw, 24px);
          color: #f5f7fa;
        }

        .pricelist-card-head {
          margin-bottom: 16px;
        }

        .pricelist-card-subtitle {
          display: block;
          color: #c5d9ce;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-align: center;
        }

        .pricelist-card-subtitle.pricelist-card-subtitle-emphasis {
          font-size: clamp(15px, 1.5vw, 18px);
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #e6efe9;
        }

        .pricelist-card-head h2 {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .pricelist-rows {
          display: grid;
          gap: 0;
        }

        .pricelist-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          padding: 14px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: inherit;
        }

        .pricelist-row:first-child {
          border-top: 0;
          padding-top: 0;
        }

        .pricelist-row-copy h3 {
          font-size: 16px;
          margin-bottom: 0;
          color: #f8fbf9;
        }

        .pricelist-row-copy p {
          font-size: 13px;
        }

        .pricelist-price-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .pricelist-price-line {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 118px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #f8fbf9;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-align: center;
        }

        .pricelist-callout {
          margin-top: 16px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #edf5f0;
          line-height: 1.6;
        }

        .pricelist-group-grid {
          display: grid;
          gap: 16px;
        }

        .pricelist-group {
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .pricelist-group:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .pricelist-group-title {
          font-size: 16px;
          color: #dbe7e0;
          margin-bottom: 10px;
        }

        .pricelist-cta {
          margin-top: 20px;
          padding: clamp(18px, 2.5vw, 26px);
          color: #f5f7fa;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pricelist-cta-label {
          color: #c8dace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pricelist-cta h2 {
          font-size: clamp(22px, 3.2vw, 30px);
          line-height: 1.1;
        }

        .pricelist-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pricelist-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 12px 22px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .pricelist-action-primary {
          background: rgba(245, 247, 250, 0.94);
          color: #0f2b1d;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .pricelist-action-primary:hover {
          background: #ffffff;
        }

        .pricelist-action-secondary {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #f6fbf8;
        }

        .pricelist-action-secondary:hover {
          background: rgba(255, 255, 255, 0.14);
        }
        
        /* Технология секция */
        .technology-section {
          padding: 80px 0;
          background-image: url('/fonsupernova.png');
          background-size: cover;
          background-position: center;
          min-height: 110vh;
        }

        .technology-section .container {
          max-width: 1320px;
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
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }

        .tech-video-card {
          padding: 0;
          display: flex;
          justify-content: flex-start;
          width: 100%;
          max-width: 100%;
          background: transparent;
          border: none;
          box-shadow: none;
          overflow: visible;
          position: static;
        }

        .tech-video-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(220px, 24vw, 300px);
          padding: 16px 36px;
          border-radius: 999px;
          background: rgba(245, 247, 250, 0.92);
          color: #0f2b1d;
          text-decoration: none;
          font-size: clamp(20px, 2.4vw, 26px);
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
          gap: clamp(18px, 2.6vw, 28px);
          width: min(100%, 820px);
          align-items: flex-start;
          margin-top: clamp(40px, 5vw, 96px);
          margin-left: 0;
        }

        .tech-copy {
          padding: clamp(22px, 3vw, 34px);
          width: 100%;
          max-width: 820px;
          margin: 0;
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
          transform: scale(1);
        }
        
        /* Галерия секция */
        .gallery-section {
          padding: 80px 0;
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 7%, rgba(255, 255, 255, 0) 93%, rgba(255, 255, 255, 0.28) 100%), url('/kaksi.png'), url('/kaksi.png');
          background-size: cover, contain, cover;
          background-repeat: no-repeat;
          background-position: center, center top, center top;
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
          min-height: clamp(440px, 64vh, 720px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-target {
          position: relative;
          width: min(52vw, 240px);
          aspect-ratio: 1 / 1;
          margin: 80px 0 0;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
          z-index: 1;
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
          left: -60px;
        }

        .gallery-nav-next {
          right: -60px;
        }

        @media (max-width: 767px) {
          .home-hero {
            background-position: center;
          }

          .home-hero .about-content {
            justify-content: center;
            padding-right: 0;
          }

          .home-hero .about-text {
            width: 100%;
            margin: 110px auto 0;
            padding: 12px 14px;
          }

          .salon-section {
            padding-top: 32px;
          }

          .salon-content {
            gap: 24px;
            padding-top: 16px;
          }

          .salon-image {
            order: -1;
            width: 100%;
            max-width: 500px;
          }

          .salon-text {
            width: 100%;
            max-width: 420px;
            padding: 28px 20px;
          }

          .pricelist-section {
            padding: 88px 0 44px;
            background-position: center top;
          }

          .pricelist-intro,
          .pricelist-note,
          .pricelist-card,
          .pricelist-cta {
            border-radius: 14px;
          }

          .pricelist-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .pricelist-price-stack {
            align-items: flex-start;
          }

          .pricelist-price-line {
            min-width: 0;
          }

          .pricelist-actions {
            flex-direction: column;
          }

          .pricelist-action {
            width: 100%;
          }

          .service-detail-card {
            width: min(100%, 420px);
            margin-left: auto;
            margin-right: auto;
            padding: 30px 22px;
          }

          .technology-section {
            background-image: url('/techtel.png');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            min-height: 110vh;
          }

          .technology-layout {
            justify-content: center;
          }

          .tech-copy {
            margin: 0;
          }

          .tech-right {
            width: min(100%, 460px);
            align-items: stretch;
            gap: 18px;
            margin-top: clamp(88px, 18vw, 132px);
            margin-left: 0;
          }

          .tech-video-card {
            width: 100%;
            justify-content: center;
          }

          .offers-section {
            padding: 112px 0 48px;
            min-height: auto;
            background-image: url('/ots.png');
            background-position: center top;
            background-size: cover;
            background-repeat: no-repeat;
          }

          .salon-section,
          .pricelist-section,
          .technology-section,
          .offers-section,
          .gallery-section,
          .service-detail,
          .contact-section {
            position: relative;
            overflow: hidden;
          }

          .salon-section::after,
          .technology-section::after,
          .gallery-section::after,
          .contact-section::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px;
            height: 44px;
            background: linear-gradient(
              to bottom,
              rgba(20, 54, 37, 0) 0%,
              rgba(20, 54, 37, 0.35) 45%,
              #143625 100%
            );
            pointer-events: none;
            z-index: 0;
          }

          .pricelist-section::after,
          .service-detail::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px;
            height: 44px;
            background: linear-gradient(
              to bottom,
              rgba(70, 81, 79, 0) 0%,
              rgba(70, 81, 79, 0.35) 45%,
              #46514f 100%
            );
            pointer-events: none;
            z-index: 0;
          }

          .offers-section::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px;
            height: 44px;
            background: linear-gradient(
              to bottom,
              rgba(93, 100, 137, 0) 0%,
              rgba(93, 100, 137, 0.35) 45%,
              #5d6489 100%
            );
            pointer-events: none;
            z-index: 0;
          }

          .salon-section .container,
          .pricelist-section .container,
          .technology-section .container,
          .offers-section .container,
          .gallery-section .container,
          .service-detail .container,
          .contact-section .container {
            position: relative;
            z-index: 1;
          }

          .offers-section .container {
            max-width: 420px;
          }

          .offers-grid {
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-top: 112px;
          }

          .offer-item {
            width: min(100%, 360px);
            height: min(100%, 360px);
          }

          .gallery-section {
            background-image: url('/kaksi1.png');
            background-size: cover;
            background-position: center top;
            padding: 56px 0 40px;
          }

          .gallery-stage {
            min-height: clamp(404px, 60vh, 576px);
            justify-content: center;
            padding-right: 0;
          }

          .gallery-target {
            width: min(82vw, 312px);
            margin-top: 128px;
          }

          .gallery-nav {
            width: 56px;
            height: 56px;
            font-size: 30px;
            top: 60%;
          }

          .gallery-nav-prev {
            left: -62px;
          }

          .gallery-nav-next {
            right: -62px;
          }

          /* Removes 1px seam between section backgrounds and footer gradient on mobile */
          .footer {
            margin-top: -1px;
          }

          .footer::before {
            top: -42px;
            height: 42px;
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

        .footer.footer-technology {
          background: #061415;
        }

        .footer.footer-technology::before {
          background: linear-gradient(to bottom, rgba(6, 20, 21, 0) 0%, rgba(6, 20, 21, 0.42) 45%, #061415 100%);
        }

        .footer.footer-technology .footer-tagline {
          color: #d7e3fb;
        }

        .footer.footer-technology .footer-info {
          color: #e1e9f6;
        }

        .footer.footer-technology .footer-social-link {
          color: #eef4ff;
          border-color: rgba(255, 255, 255, 0.26);
          background: rgba(255, 255, 255, 0.08);
        }

        .footer.footer-technology .footer-social-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .footer.footer-technology .footer-bottom {
          border-top-color: rgba(255, 255, 255, 0.14);
          color: #cdd9ee;
        }

        .footer.footer-gallery {
          background: #dcc9ef;
          color: #392946;
        }

        .footer.footer-gallery::before {
          background: linear-gradient(to bottom, rgba(220, 201, 239, 0) 0%, rgba(220, 201, 239, 0.62) 45%, #dcc9ef 100%);
        }

        .footer.footer-gallery .footer-tagline {
          color: #6f4893;
        }

        .footer.footer-gallery .footer-info {
          color: #523b68;
        }

        .footer.footer-gallery .footer-social-link {
          color: #523b68;
          border-color: rgba(82, 59, 104, 0.18);
          background: rgba(255, 255, 255, 0.66);
        }

        .footer.footer-gallery .footer-social-link:hover {
          color: #fff8fb;
          background: rgba(111, 72, 147, 0.9);
          border-color: rgba(111, 72, 147, 0.9);
        }

        .footer.footer-gallery .footer-bottom {
          border-top-color: rgba(82, 59, 104, 0.18);
          color: #694f82;
        }

        .footer.footer-gallery .footer-logo img {
          filter:
            drop-shadow(0 0 1px rgba(57, 41, 70, 0.62))
            drop-shadow(0 6px 18px rgba(57, 41, 70, 0.26));
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

        .footer-socials {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .footer-social-link {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #e5efe9;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.06);
          transition: all 0.2s ease;
        }

        .footer-social-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.42);
        }

        .footer-social-icon {
          width: 18px;
          height: 18px;
          display: block;
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
          margin-top: 52px;
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
          
          .salon-section .container {
            max-width: 1320px;
          }

          .salon-content {
            grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
            gap: clamp(36px, 5vw, 84px);
            padding-top: clamp(40px, 5vw, 72px);
            margin-top: 0;
          }

          .pricelist-hero {
            grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
            align-items: stretch;
          }

          .pricelist-cta {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .service-detail-card {
            transform: translateX(178px);
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .technology-layout {
            max-width: 1320px;
          }

          .tech-right {
            width: min(100%, 820px);
            gap: clamp(20px, 2.4vw, 30px);
            align-items: flex-start;
            margin-top: clamp(48px, 5vw, 104px);
            margin-left: 0;
          }

          .tech-video-card {
            position: static;
            justify-content: flex-start;
          }

          .tech-copy {
            margin: 0;
            max-width: 820px;
          }
          
          .offers-grid {
            gap: 34px;
          }
          
          .gallery-stage {
            min-height: clamp(520px, 70vh, 820px);
            justify-content: center;
            padding-right: 0;
          }

          .gallery-target {
            width: min(32vw, 300px);
          }

          .gallery-nav-prev {
            left: -68px;
          }

          .gallery-nav-next {
            right: -68px;
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

          .pricelist-layout {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr) minmax(0, 1fr);
            gap: 20px;
          }

          .tech-right {
            position: static;
            padding-top: 0;
            margin-top: clamp(164px, 12vw, 232px);
            margin-left: 0;
            --tech-desktop-shift: clamp(-510px, -29vw, -350px);
          }

          .tech-video-card {
            position: static;
            top: auto;
            left: auto;
            width: 100%;
            max-width: 820px;
            margin-left: var(--tech-desktop-shift);
            justify-content: center;
          }

          .tech-copy {
            margin-left: var(--tech-desktop-shift);
          }

          .tech-video-link {
            min-width: clamp(240px, 18vw, 320px);
            padding: 16px 34px;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .offers-grid {
            gap: 38px;
          }

          .gallery-stage {
            min-height: clamp(600px, 76vh, 900px);
          }

          .gallery-target {
            width: min(31vw, 390px);
            margin-top: 108px;
          }

          .gallery-nav-prev {
            left: -80px;
          }

          .gallery-nav-next {
            right: -80px;
          }
          
          .map-container-large {
            height: 550px;
          }
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          .tech-right {
            width: min(100%, 760px);
            margin-top: clamp(152px, 12vw, 220px);
            --tech-desktop-shift: clamp(-260px, -17vw, -150px);
          }

          .tech-copy,
          .tech-video-card {
            max-width: 760px;
          }
        }
      `}</style>

      <header className={`header${isScrolled ? " scrolled" : ""}`} id="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <img
              src="/textlogo.png"
              alt="DesiSlava Studio"
              className="logo-image"
            />
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end>
                {item.label}
              </NavLink>
            ))}
            <div
              ref={desktopServicesRef}
              className={`services-nav${isDesktopServicesOpen ? " open" : ""}`}
              onMouseEnter={() => setIsDesktopServicesOpen(true)}
              onFocusCapture={() => setIsDesktopServicesOpen(true)}
              onBlurCapture={handleDesktopServicesBlur}
            >
              <NavLink
                to={pricesItem.to}
                className={({ isActive }) =>
                  `nav-link services-trigger${
                    servicesActive || isActive ? " active" : ""
                  }`
                }
                end
              >
                Услуги и ценоразпис
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
                    onClick={closeServiceMenus}
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
              Контакти
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
              <span>Услуги и ценоразпис</span>
              <span>▾</span>
            </button>
            {isServicesOpen && (
              <div className="mobile-services-dropdown">
                <NavLink
                  to={pricesItem.to}
                  onClick={closeServiceMenus}
                  className={({ isActive }) =>
                    `mobile-services-link${isActive ? " active" : ""}`
                  }
                  end
                >
                  {pricesItem.label}
                </NavLink>
                {serviceLinks.map((service) => (
                  <NavLink
                    key={service.to}
                    to={service.to}
                    onClick={closeServiceMenus}
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
              Контакти
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
              <img src="/textlogo.png" alt="DesiSlava Studio" />
            </div>
            <div className="footer-text">
              <p className="footer-info">
                Професионални козметични процедури с внимание към всеки детайл и
                индивидуален подход. Работим с модерна технология и безопасни
                методи, за да постигнем естествени и трайни резултати.
              </p>
              <div className="footer-socials">
                <a
                  href={SOCIAL_LINKS.facebook}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9c0-.6.4-1 1-1z" />
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-bottom">
              © 2025 DesiSlava Studio. Всички права
              запазени.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
