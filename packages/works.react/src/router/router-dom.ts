import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation as _useLocation,
  useNavigate as _useNavigate,
  useParams as _useParams
} from 'react-router-dom';

export const ZRouter = HashRouter;
export const ZTestRouter = Router;
export const ZRoute = Route;
export const ZRouteMap = Routes;
export const ZNavigate = Navigate;
export const ZOutlet = Outlet;

export const useNavigate: () => (route: string) => void = _useNavigate;
export const useLocation = _useLocation;
export const useParams = _useParams;
