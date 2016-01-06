//
//  RetroDiscovery.swift
//  retromobile
//
//  Created by Sebastian Hof on 02/01/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

@objc( RCTRetroDiscovery )
class RCTRetroDiscovery: NSObject, RCTBridgeModule, NSNetServiceBrowserDelegate, NSNetServiceDelegate {
  var browser: NSNetServiceBrowser;
  weak var bridge: RCTBridge?;
  var service: NSNetService?;
  
  override init() {
    browser = NSNetServiceBrowser();
    super.init();
    browser.delegate = self;
  }
  
  class func moduleName() -> String {
    return "RCTRetroDiscovery";
  }
  
  @objc func searchRetroHub() {
    browser.stop();
    browser.searchForServicesOfType("_http._tcp.", inDomain: "local.");
  }
  
  @objc func stopSearch() {
    browser.stop();
  }
  
  func parseRetroHubId(serviceName: String) -> String {
    var split = serviceName.characters.split{$0 == ":"}.map(String.init);
    if (split.count == 2) {
      return split[1];
    } else {
      return "NO_ID_DETECTED"
    }
  }
  
  // MARK: NSNetServiceBrowserDelegate
  
  func netServiceBrowser(browser: NSNetServiceBrowser, didFindService service: NSNetService, moreComing: Bool) {
    
    if (service.name.hasPrefix("RetroHub")) {
      self.service = service;
      self.service?.delegate = self;
      self.service?.resolveWithTimeout(5);
    }
    
  }
  
  func netServiceBrowser(browser: NSNetServiceBrowser, didNotSearch errorDict: [String : NSNumber]) {
    
    for (_, value) in errorDict {
      print("RetroDiscovery:Error \(value)");
      self.bridge?.eventDispatcher.sendAppEventWithName("RetroDiscovery:Error", body: value);
    }
    
  }
  
//  func netServiceBrowser(browser: NSNetServiceBrowser, didRemoveService service: NSNetService, moreComing: Bool) {
//    
//    if (service.name.hasPrefix("RetroHub")) {
//      self.bridge.eventDispatcher.sendAppEventWithName("RetroDiscovery:DidRemoveRetroHub", body:[ "id": self.parseRetroHubId(service.name) ]);
//    }
//    
//  }
  
  
  func netServiceBrowserWillSearch(browser: NSNetServiceBrowser) {
    self.bridge?.eventDispatcher.sendAppEventWithName("RetroDiscovery:WillSearchRetroHub", body: nil);
  }
  
  func netServiceBrowserDidStopSearch(browser: NSNetServiceBrowser) {
    self.service?.stop();
    
    self.bridge?.eventDispatcher.sendAppEventWithName("RetroDiscovery:DidStopSearchRetroHub", body: nil);
  }
  
  // MARK: NSNetServiceDelegate
  
  func netServiceDidResolveAddress(service: NSNetService) {
  
    let index = service.hostName?.endIndex.advancedBy(-1) ?? "".endIndex;

    let hostName = service.hostName!.hasSuffix(".") ? service.hostName!.substringToIndex(index) : service.hostName!;
    
    self.bridge?.eventDispatcher.sendAppEventWithName("RetroDiscovery:FoundRetroHub", body:[ "name": "RetroHub", "id": self.parseRetroHubId(service.name), "hostName": hostName ] as NSDictionary);

  }
  
  func netService(service: NSNetService, didNotResolve errorDict: [String : NSNumber]) {
    
    for (_, value) in errorDict {
      print("RetroDiscovery:Error \(value)");
      self.bridge?.eventDispatcher.sendAppEventWithName("RetroDiscovery:Error", body: value);
    }
    
  }
  
  
}