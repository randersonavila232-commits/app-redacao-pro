import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Criar cliente Supabase com as credenciais
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Variáveis de ambiente do Supabase não configuradas');
    return res;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  // Obter token de autenticação dos cookies
  const token = req.cookies.get('sb-access-token')?.value;
  
  if (token) {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      // Token inválido ou expirado
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      return response;
    }

    // Verificar se é admin para rotas /admin
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('is_admin')
        .eq('user_id', user.id)
        .single();

      if (!roleData?.is_admin) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  } else {
    // Rotas públicas que não precisam de autenticação
    const publicRoutes = ['/', '/login', '/register'];
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

    // Se não está autenticado e tenta acessar rota protegida
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
