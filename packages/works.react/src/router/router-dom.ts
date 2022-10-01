import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Router,
  Routes,
  useNavigate as _useNavigate,
  useParams as _useParams
} from 'react-router-dom';

export const ZRouter = HashRouter;
export const ZTestRouter = Router;
export const ZRoute = Route;
export const ZRouteMap = Routes;
export const ZNavigate = Navigate;
export const ZOutlet = Outlet;

export const useNavigate = _useNavigate;
export const useParams = _useParams;
