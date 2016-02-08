//
//  RetroColorPickerView.m
//  retromobile
//
//  Created by Sebastian Hof on 24/01/16.
//  Copyright © 2016 Facebook. All rights reserved.
//
#import"RCTColorPickerManager.h"

#import <UIKit/UIKit.h>
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "UIView+React.h"

struct HueColor {
  double hue;
  double saturation;
  double brighness;
} hueColor;

@implementation RCTColorPickerManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RCTColorPickerView *view = [[RCTColorPickerView alloc] initWithFrame:CGRectMake(0,0,200,400) color:[UIColor colorWithHue:0.10 saturation:0.10 brightness:0.10 alpha:1.00]];
  view.delegate = self;
  return view;
}

- (void)colorPickerView:(RCTColorPickerView *)colorPickerView didChangeColorWithHue:(CGFloat)hue saturation:(CGFloat)saturation brightness:(CGFloat)brightness
{
  [self.bridge.eventDispatcher sendInputEventWithName:@"topChange"
                                                 body:@{@"target": colorPickerView.reactTag,
                                                        @"color": @{
                                                          @"hue": @(roundf(hue * 365.0f)),
                                                          @"saturation": @(roundf(saturation * 100.0f)),
                                                          @"brightness": @(roundf(brightness * 100.0f))
                                                        }
   }];
}

RCT_CUSTOM_VIEW_PROPERTY(color, HueColor, RCTColorPickerView)
{
  if (json) {
    CGFloat hue = [json[@"hue"] doubleValue] / 365.0f;
    CGFloat saturation = [json[@"saturation"] doubleValue] / 100.0f;
    CGFloat brightness = [json[@"brightness"] doubleValue]  / 100;
    
    [view setColor:[UIColor colorWithHue:hue saturation:saturation brightness:brightness alpha:1.0]];
  } else {
    [view setColor:[UIColor colorWithHue:0.10 saturation:0.10 brightness:1.00 alpha:1.0]];
  }
}

@end



