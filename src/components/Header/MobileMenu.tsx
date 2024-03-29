import { CloseMenuButton } from '@/components/common/CloseMenuButton';
import { SocialLinks } from '@/components/common/SocialLinks';
import theme from '@/lib/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiChevronDown, FiPhone } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { CategoryList } from './CategoryList';

interface MobileMenuProps {
  toggleClose: () => void;
  isOpen: boolean;
}

export function MobileMenu({ toggleClose, isOpen }: MobileMenuProps) {
  const [shouldShowCategories, setShouldShowCategories] = useState(false);
  const mobileMenuRef = useRef(null);
  useOnClickOutside(mobileMenuRef, toggleClose);

  const toggleCategories = () => setShouldShowCategories((prev) => !prev);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={mobileMenuRef}
          initial={{ width: 0 }}
          animate={{ width: theme.spacing[80] }}
          exit={{ width: 0 }}
          className="fixed left-0 top-0 z-50 flex h-screen max-w-full flex-col content-start justify-between overflow-hidden border-r bg-white"
        >
          <div className="p-3">
            <section className="flex items-center justify-between">
              <h2 className="font-semibold uppercase text-gray-400">Menu</h2>
              <CloseMenuButton close={toggleClose} />
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
