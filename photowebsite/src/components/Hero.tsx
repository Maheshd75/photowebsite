import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onShopNowClick?: () => void;
}

export function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl tracking-tight">
                Frame Your
                <span className="block text-primary">Memories</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our premium collection of handcrafted photo frames. From elegant wooden designs to sleek modern styles, find the perfect frame for every memory.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8" onClick={onShopNowClick}>
                Shop All Products
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View Collections
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl">500+</div>
                <div className="text-sm text-muted-foreground">Frame Styles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">5★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1614447413359-5f87a652a269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwd2FsbCUyMGZyYW1lc3xlbnwxfHx8fDE3NTkyMjY2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gallery wall with various photo frames"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}