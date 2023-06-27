import cx from 'classnames';
import { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineMail } from 'react-icons/hi';
import { FiChevronDown, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import categories from 'lib/categories';
import CategoryLink from '../components/CategoryLink';
import SocialLinks from 'components/common/SocialLinks';

interface MobileDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

function MobileDrawerMenu({ onClose, isOpen }: MobileDrawerProps) {
  const [shouldShowCategories, setShouldShowCategories] = useState(false);

  const handleCategoriesToggle = () => setShouldShowCategories((prev) => !prev);

  return (
    <div aria-hidden={!isOpen}>
      {isOpen && <div className="absolute left-0 top-0 h-screen w-screen bg-black/60" />}
      <div
        className={cx(
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'fixed left-0 top-0 z-40 flex h-screen w-80 max-w-full flex-col content-start justify-between overflow-y-auto bg-white p-3 transition-transform'
        )}
      >
        <div>
          <header className="flex items-center justify-between">
            <h2 className="font-semibold uppercase text-gray-400">Menu</h2>
            <button
              aria-label="Close menu"
              type="button"
              className="rounded-sm p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-800"
              onClick={onClose}
            >
              <TfiClose size={16} strokeWidth={2} />
            </button>
          </header>

          <section className="overflow-y-auto py-6">
            <ul className="space-y-3 font-medium">
              <li>
                <Link
                  to="/"
                  className="flex items-center rounded-sm p-3 text-gray-900 hover:bg-gray-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-sm p-3 hover:bg-gray-200"
                  onClick={handleCategoriesToggle}
                >
                  <span>Products</span>
                  <FiChevronDown size={20} />
                </button>
                <ul className={cx(shouldShowCategories ? 'block' : 'hidden', ' space-y-2 py-2')}>
                  <li className="ml-3 rounded-sm hover:bg-gray-200">
                    <CategoryLink
                      onClick={handleCategoriesToggle}
                      category={null}
                      label="All products"
                    />
                  </li>
                  {categories.map((category) => (
                    <li className="ml-3 rounded-sm  hover:bg-gray-200" key={category}>
                      <CategoryLink
                        onClick={handleCategoriesToggle}
                        category={category}
                        label={category}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </section>
        </div>

        <footer className="border-t border-gray-200 pt-3">
          <h3 className="font-semibold uppercase text-gray-400">Contact us</h3>
          <div className="mt-6">
            <div className="flex items-center gap-3">
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
        </footer>
      </div>
    </div>
  );
}

export default MobileDrawerMenu;
