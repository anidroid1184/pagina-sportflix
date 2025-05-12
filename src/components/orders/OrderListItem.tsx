import type { Order } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Calendar, DollarSign, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

interface OrderListItemProps {
  order: Order;
  style?: CSSProperties;
}

const translateStatus = (status: Order['status']): string => {
  switch (status) {
    case 'Pending': return 'Pendiente';
    case 'Processing': return 'En Proceso';
    case 'Shipped': return 'Enviado';
    case 'Delivered': return 'Entregado';
    case 'Cancelled': return 'Cancelado';
    default: return status;
  }
};

export function OrderListItem({ order, style }: OrderListItemProps) {
  const orderDate = new Date(order.date).toLocaleDateString('es-ES', { // Using es-ES for Spanish date format
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatCOP = (amount: number) => {
    return amount.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg",
        "motion-safe:animate-fade-in-up"
      )}
      style={style}
    >
      <CardHeader className="bg-muted/30 p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold sm:text-xl">Pedido #{order.id}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm">
              <Calendar className="h-4 w-4" />
              Realizado el {orderDate}
            </CardDescription>
          </div>
          <Badge 
            variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}
            className={cn(
                "py-1 px-2.5 text-xs font-medium",
                order.status === 'Delivered' && 'bg-green-500 text-white dark:bg-green-600',
                order.status === 'Shipped' && 'bg-blue-500 text-white dark:bg-blue-600',
                order.status === 'Processing' && 'bg-yellow-400 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-950',
                order.status === 'Cancelled' && 'bg-red-500 text-white dark:bg-red-600',
                order.status === 'Pending' && 'bg-gray-400 text-gray-900 dark:bg-gray-500 dark:text-gray-950'
            )}
          >
            {translateStatus(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Artículos:</h4>
          <ul className="space-y-3">
            {order.items.slice(0, 2).map((item) => ( 
              <li key={item.productId} className="flex items-start gap-3">
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="rounded-md border object-cover aspect-square"
                  data-ai-hint="product clothing"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-sm">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    Cant: {item.quantity} 
                    {item.size && ` | Talla: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                </div>
                <p className="text-sm font-medium text-right">{formatCOP(item.price * item.quantity)}</p>
              </li>
            ))}
            {order.items.length > 2 && (
                <li className="text-xs text-muted-foreground pt-1">...y {order.items.length - 2} artículo(s) más</li>
            )}
          </ul>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-1.5 text-base font-medium text-muted-foreground">
             <DollarSign className="h-5 w-5" /> Total:
          </div>
          <span className="text-lg font-semibold text-primary">{formatCOP(order.totalAmount)}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 p-4">
        <div className="flex w-full items-center justify-end gap-2">
          <Button asChild variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {/* In a real app, this would link to a specific order details page */}
            <Link href="#"> 
              Ver Detalles
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
