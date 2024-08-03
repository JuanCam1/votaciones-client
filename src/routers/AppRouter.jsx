import { Navigate, Route } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import {
  LoginPage,
  VotantePage,
  CreateVotantePage,
  CandidatoPage,
  EleccionPage,
  UsuarioPage,
  ReportePage,
  CreateCandidatoPage,
  CreateUsuarioPage,
  CreateEleccionPage,
  UploadDataPage,
  VotacionPage,
  AddCandidatoPage,
  AddUsuarioPage,
  VotacionUsuarioPage
} from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
import ValidateRoutes from "./ValidateRoute";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import { pathsRoutes } from "./pathsRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ValidateRoutes />}>
        <Route path={`/${pathsRoutes.LOGIN}`} element={<LoginPage />} />
      </Route>
      <Route path={`/${pathsRoutes.VOTACION}`} element={<VotacionPage />} />

      <Route path={`/${pathsRoutes.DASH}`} element={<ProtectedRoutes />}>
        <Route index element={<ReportePage />} />
        <Route path={`${pathsRoutes.CANDIDATOS}`} element={<CandidatoPage />} />
        <Route path={`${pathsRoutes.USUARIOS}`} element={<UsuarioPage />} />
        <Route path={`${pathsRoutes.ELECCIONES}`} element={<EleccionPage />} />
        <Route path={`${pathsRoutes.CARGARINFO}`} element={<UploadDataPage />} />
        <Route path={`${pathsRoutes.CARGARCANDIDATO}`} element={<AddCandidatoPage />} />
        <Route path={`${pathsRoutes.CARGARUSUARIO}`} element={<AddUsuarioPage />} />
        <Route path={`${pathsRoutes.VOTANTES}`} element={<VotantePage />} />
        <Route path={`${pathsRoutes.VOTACIONUSUARIO}`} element={<VotacionUsuarioPage />} />

        <Route element={<ProtectedAdminRoutes />}>
          <Route path={`${pathsRoutes.CREATEVOTANTE}`} element={<CreateVotantePage />} />
          <Route path={`${pathsRoutes.CREATECANDIDATO}`} element={<CreateCandidatoPage />} />
          <Route path={`${pathsRoutes.CREATEUSUARIO}`} element={<CreateUsuarioPage />} />
          <Route path={`${pathsRoutes.CREATEELECCION}`} element={<CreateEleccionPage />} />

          <Route path="*" element={<Navigate to={`/${pathsRoutes.DASH}`} />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);
