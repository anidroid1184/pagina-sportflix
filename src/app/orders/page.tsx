'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getOrdersByUserId } from '@/data/orders';
import type { Order } from '@/types';
import { OrderListItem } from '@/components/orders/OrderListItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListOrdered, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user) {
        router.push('/login?redirect=/orders');
      } else {
        // Simulate fetching orders
        const userOrders = getOrdersByUserId(user.id);
        setOrders(userOrders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setPageLoading(false);
      }
    }
  }, [user, isAuthenticated, authLoading, router]);

  if (authLoading || pageLoading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <div className="animate-pulse text-xl font-semibold">Cargando tus pedidos...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
      // This case should ideally be handled by the redirect, but as a fallback:
      return (
          <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-12 text-center motion-safe:animate-fade-in">
              <h1 className="mb-4 text-2xl font-bold">Acceso Denegado</h1>
              <p className="mb-6 text-muted-foreground">Por favor, inicia sesión para ver tu historial de pedidos.</p>
              <Button asChild>
                  <Link href="/login?redirect=/orders">Iniciar Sesión</Link>
              </Button>
          </div>
      );
  }


  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between motion-safe:animate-fade-in-down">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
          <ListOrdered className="h-8 w-8 md:h-10 md:w-10" />
          Mis Pedidos
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed bg-card p-12 text-center motion-safe:animate-fade-in-up">
          <ShoppingBag className="mb-6 h-20 w-20 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Aún No Tienes Pedidos</h2>
          <p className="mt-2 mb-6 text-muted-foreground">
            No has realizado ningún pedido. ¡Comienza a comprar para verlos aquí!
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">Comenzar a Comprar</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <OrderListItem 
              key={order.id} 
              order={order} 
              style={{ animationDelay: `${index * 0.05}s` }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
