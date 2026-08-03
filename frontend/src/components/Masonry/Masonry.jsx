import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

import './Masonry.css';

// Icons
import {
  FaAtom,
  FaCalculator,
  FaCogs,
  FaDraftingCompass,
  FaHeartbeat,
  FaFlask,
  FaDna,
  FaBriefcase,
  FaChartLine
} from "react-icons/fa";

const iconMap = {
  FaAtom: <FaAtom />,
  FaCalculator: <FaCalculator />,
  FaCogs: <FaCogs />,
  FaDraftingCompass: <FaDraftingCompass />,
  FaHeartbeat: <FaHeartbeat />,
  FaFlask: <FaFlask />,
  FaDna: <FaDna />,
  FaBriefcase: <FaBriefcase />,
  FaChartLine: <FaChartLine />
};

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true
}) => {
  const navigate = useNavigate();
  // Adjust columns dynamically based on layout needs (Desktop: 3, Tablet: 2, Mobile: 1)
  const columns = useMedia(
    ['(min-width:1200px)', '(min-width:900px)', '(min-width:600px)'],
    [3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  // Adjust container height dynamically to prevent layout overlap with the "View More" button
  useEffect(() => {
    if (!containerRef.current || grid.length === 0) return;
    const heights = new Array(columns).fill(0);
    grid.forEach(item => {
      const colIndex = Math.round(item.x / item.w);
      if (colIndex >= 0 && colIndex < columns) {
        heights[colIndex] = Math.max(heights[colIndex], item.y + item.h);
      }
    });
    const maxHeight = Math.max(...heights);
    containerRef.current.style.height = `${maxHeight}px`;
  }, [grid, columns]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item, index);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div ref={containerRef} className="list">
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className={`item-wrapper course-masonry-card theme-${item.category}`}
            onClick={() => navigate(item.url)}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            <div className="card-inner-wrapper">
              
              {/* Course Banner Cover Image */}
              <div className="card-image-header" style={{ backgroundImage: `url(${item.img})` }}>
                <div className={`category-badge ${item.category}`}>
                  {item.category.toUpperCase()}
                </div>
              </div>

              {/* Course Info Card Body */}
              <div className="card-body">
                
                <div className="card-title-row">
                  <div className={`icon-circle ${item.category}`}>
                    {iconMap[item.icon]}
                  </div>
                  <h3 className="course-title">{item.title}</h3>
                </div>

                <p className="course-sub">{item.subtitle}</p>

                <button className={`explore-btn ${item.category}`}>
                  Explore Course <span className="arrow">→</span>
                </button>

              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
