"use server";

import { cookies } from "next/headers";
import { AuthState } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

/**
 * Sets the authentication token in an HTTP-only cookie.
 */
export async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookieStore = await cookies();

  if (rememberMe) {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  } else {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60, // 1 day
      path: "/",
    });
  }
}

/**
 * Retrieves the token from cookies.
 */
export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return token;
}

/**
 * Deletes the token cookie on logout.
 */
export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

/**
 * Verifies the current token with the API and returns the user details.
 * If invalid or missing, returns the null initial state.
 */
export async function verifyToken(): Promise<AuthState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  // Initial null state for unauthenticated users
  const guestState: AuthState = {
    isAuthenticated: false,
    userInfo: null,
    userName: null,
    email: null,
  };

  if (!token) {
    return guestState;
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    
    if (data.message === "verified") {
      const { name, id, role, email } = data.decoded; 

      return {
        isAuthenticated: true,
        userName: name,
        email: email || null,
        userInfo: {
          name,
          id,
          role,
          email,
        },
      };
    }

    return guestState;
  } catch (error) {
    return guestState;
  }
}