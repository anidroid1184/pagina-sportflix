import type { Order } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Calendar, DollarSign, ShoppingCart } from 'lucide-react';

interface OrderListItemProps {
  order: Order;
}

export function OrderListItem({ order }: OrderListItemProps) {
  const orderDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="bg-muted/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Order #{order.id}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Placed on {orderDate}
            </CardDescription>
          </div>
          <Badge 
            variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}
            className={cn(
                order.status === 'Delivered' && 'bg-green-600 text-white',
                order.status === 'Shipped' && 'bg-blue-500 text-white',
                order.status === 'Processing' && 'bg-yellow-500 text-black',
            )}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Items:</h4>
          <ul className="space-y-3">
            {order.items.slice(0, 2).map((item) => ( // Show first 2 items, more can be on order details page
              <li key={item.productId} className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={60}
                  height={60}
                  className="rounded-md border object-cover"
                  data-ai-hint="product clothing"
                />
                <div className="flex-grow">
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                  </p>
                </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
            {order.items.length > 2 && (
                <li className="text-sm text-muted-foreground">...and {order.items.length - 2} more item(s)</li>
            )}
          </ul>
        </div>
        
        <div className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center gap-1.5 text-muted-foreground">
             <DollarSign className="h-5 w-5" /> Total:
          </div>
          <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <div className="flex w-full items-center justify-end gap-2">
          {/* <Button variant="outline" size="sm">
            <Package className="mr-2 h-4 w-4" /> Track Order
          </Button> */}
          <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90">
            {/* In a real app, this would link to a specific order details page */}
            <Link href="#"> 
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
