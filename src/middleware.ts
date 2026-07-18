import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function middleware(request: NextRequest) {

  const response = NextResponse.next();


  const supabase = createServerClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    {

      cookies: {

        getAll() {

          return request.cookies.getAll();

        },


        setAll(cookies) {

          cookies.forEach(({name,value}) => {

            response.cookies.set(
              name,
              value
            );

          });

        },

      },

    }

  );



  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();




  const pathname = request.nextUrl.pathname;




  const protectedRoutes = [

    "/dashboard",
    "/profil",
    "/dokumente",
    "/status",
    "/admin",

  ];



  const needsAuth = protectedRoutes.some(
    route =>
      pathname.startsWith(route)
  );



  if(needsAuth && !user){

    return NextResponse.redirect(
      new URL("/login",request.url)
    );

  }



  return response;

}



export const config = {

  matcher:[

    "/dashboard/:path*",
    "/profil/:path*",
    "/dokumente/:path*",
    "/status/:path*",
    "/admin/:path*",

  ],

};