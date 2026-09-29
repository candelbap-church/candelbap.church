#import <AppKit/AppKit.h>
#import <ImageIO/ImageIO.h>

int main(void) {
    @autoreleasepool {
        NSString *sourcePath = @"/Users/jethroguce/Downloads/Copy of seal.png";
        NSString *outputPath = @"/Users/jethroguce/Documents/work/CCBC/website/brand-guide/assets/ccbc-seal-crop.png";
        NSURL *sourceURL = [NSURL fileURLWithPath:sourcePath];
        CGImageSourceRef source = CGImageSourceCreateWithURL((__bridge CFURLRef)sourceURL, NULL);
        if (!source) return 1;
        CGImageRef image = CGImageSourceCreateImageAtIndex(source, 0, NULL);
        CFRelease(source);
        if (!image) return 2;

        // The source seal is slightly oval and has hand-erased edge artifacts.
        // Fit the complete mark to a round alpha mask, retaining clear padding.
        const size_t size = 1500;
        const size_t diameter = 1400;
        const CGFloat inset = (size - diameter) / 2.0;
        CGRect sourceCrop = CGRectMake(280, 360, 1400, 1340);
        CGImageRef seal = CGImageCreateWithImageInRect(image, sourceCrop);
        if (!seal) { CGImageRelease(image); return 3; }
        CGColorSpaceRef colorSpace = CGColorSpaceCreateWithName(kCGColorSpaceSRGB);
        CGContextRef context = CGBitmapContextCreate(NULL, size, size, 8, size * 4,
            colorSpace,
            kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
        CGColorSpaceRelease(colorSpace);
        if (!context) { CGImageRelease(seal); CGImageRelease(image); return 4; }

        CGContextClearRect(context, CGRectMake(0, 0, size, size));
        CGContextSaveGState(context);
        CGContextAddEllipseInRect(context, CGRectMake(inset, inset, diameter, diameter));
        CGContextClip(context);
        CGContextDrawImage(context, CGRectMake(inset, inset, diameter, diameter), seal);
        CGContextRestoreGState(context);

        CGImageRef cropped = CGBitmapContextCreateImage(context);
        NSURL *outputURL = [NSURL fileURLWithPath:outputPath];
        CGImageDestinationRef destination = CGImageDestinationCreateWithURL((__bridge CFURLRef)outputURL,
            CFSTR("public.png"), 1, NULL);
        if (!cropped || !destination) return 5;
        CGImageDestinationAddImage(destination, cropped, NULL);
        BOOL ok = CGImageDestinationFinalize(destination);
        CFRelease(destination);
        CGImageRelease(cropped);
        CGContextRelease(context);
        CGImageRelease(seal);
        CGImageRelease(image);
        if (!ok) return 6;
        printf("%s\n", [outputPath UTF8String]);
        return 0;
    }
}
