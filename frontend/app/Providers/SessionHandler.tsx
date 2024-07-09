"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setSession } from "../state/sessionSlice";
import { AppDispatch } from "../state/store";

const SessionHandler = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session) {
      dispatch(setSession(session));
    }
  }, [session, dispatch]);

  return null;
};

export default SessionHandler;
