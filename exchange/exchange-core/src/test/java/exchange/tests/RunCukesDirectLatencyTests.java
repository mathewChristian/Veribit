package exchange.tests;

import exchange.core.common.config.PerformanceConfiguration;
import exchange.tests.steps.OrderStepdefs;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import lombok.extern.slf4j.Slf4j;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty", "html:target/cucumber"}, strict = true)
@Slf4j
public class RunCukesDirectLatencyTests {

    @BeforeClass
    public static void beforeClass() {
        OrderStepdefs.testPerformanceConfiguration = PerformanceConfiguration.latencyPerformanceBuilder().build();
    }

    @AfterClass
    public static void afterClass() {
        OrderStepdefs.testPerformanceConfiguration = null;
    }

}
