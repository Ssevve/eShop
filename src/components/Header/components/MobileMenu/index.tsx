import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineMail } from 'react-icons/hi';
import { FiChevronDown, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import theme from 'lib/theme';
import SocialLinks from 'components/common/SocialLinks';
import CategoryList from '../CategoryList';

interface MobileMenuProps {
  toggleClose: () => void;
  isOpen: boolean;
}

function MobileMenu({ toggleClose, isOpen }: MobileMenuProps) {
  const [shouldShowCategories, setShouldShowCategories] = useState(false);

  const toggleCategories = () => setShouldShowCategories((prev) => !prev);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: theme.width[80] }}
          exit={{ width: 0 }}
          className="fixed left-0 top-0 z-50 flex h-screen max-w-full flex-col content-start justify-between overflow-hidden border-r bg-white"
        >
          <div className="p-3">
            <section className="flex items-center justify-between">
              <h2 className="font-semibold uppercase text-gray-400">Menu</h2>
              <button
                aria-label="Close menu"
                type="button"
                className="rounded-sm p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-800"
                onClick={toggleClose}
              >
                <TfiClose size={16} strokeWidth={2} />
              </button>
            </section>
            <section className="overflow-y-auto py-6">
              <ul className="space-y-3 overflow-x-hidden font-medium">
                <li>
                  <Link to="/" className="flex items-center rounded-sm p-3 hover:bg-gray-200">
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-sm p-3 hover:bg-gray-200"
                    onClick={toggleCategories}
                  >
                    <span>Products</span>
                    <FiChevronDown size={20} />
                  </button>
                  {shouldShowCategories && <CategoryList toggleClose={toggleClose} />}
                </li>
              </ul>
            </section>
          </div>
          <div className="p-3">
            <section className="w-full min-w-max border-t border-gray-200 pt-3">
              <h3 className="font-semibold uppercase text-gray-400">Contact us</h3>
              <div className="mt-6">
                <div className="flex gap-3 selection:items-center">
                  <HiOutlineMail size={20} />
                  <p className="text-sm font-medium">eshop@eshop.com</p>
                </div>
                <div className="mt-3">
                  <div className="flex gap-3">
                    <FiPhone size={20} />
                    <p className="text-sm font-medium">44 555 66 77</p>
                  </div>
                  <div className="ml-8 mt-1.5 flex gap-3 text-sm text-gray-400">
                    <p>Mon. - Fri.</p>
                    <p>8 a.m - 9 p.m.</p>
                  </div>
                  <div className="ml-8 flex gap-3 text-sm text-gray-400">
                    <p>Sat. - Sun.</p>
                    <p>8 a.m - 7 p.m.</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex">
                <SocialLinks />
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
