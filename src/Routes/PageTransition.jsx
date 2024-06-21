import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation, Outlet } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={500} classNames="slide">
        <div>
          {children}
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
