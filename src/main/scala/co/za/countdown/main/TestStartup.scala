package co.za.countdown.main

import co.za.countdown.serve.ServeCountdowns
import co.za.countdown.source.GamesWebScrape
import org.joda.time.DateTime
import co.za.countdown.counter.CountdownService
import co.za.countdown.Countdown
import java.net.URL
import unfiltered.jetty.ContextBuilder

/**
 * User: dawid
 * Date: 11/29/11
 * Time: 8:44 PM
 */

object TestStartup extends App {
  GamesWebScrape.getOnline foreach ((countDown: (String, DateTime)) => CountdownService.upsertCountdown(countDown))
  unfiltered.jetty.Http(55555)
    .context("/static") {
      (builder: ContextBuilder) => builder.resources(new URL(getClass.getResource("/static/"), "."))}
    .filter(ServeCountdowns.countdowns).run()
}