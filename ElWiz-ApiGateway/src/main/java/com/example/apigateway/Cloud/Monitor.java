package com.example.apigateway.Cloud;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cloudwatch.CloudWatchClient;
import software.amazon.awssdk.services.cloudwatch.model.*;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;
import software.amazon.awssdk.services.sns.model.SnsException;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Component;

@Component
public class Monitor {
    private static CloudWatchClient cw = CloudWatchClient.builder().region(Region.US_EAST_1)
            .region(Region.US_EAST_1)
            .build();

    private static int alrmId = 0;

    public void putMetric(String name, String Value, String MetricName, String Namespace, Double data) {

        String time = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT);
        Instant instant = Instant.parse(time);
        Dimension dimension = Dimension.builder()
                .name(name)
                .value(Value)
                .build();
        MetricDatum datum = MetricDatum.builder()
                .metricName(MetricName)
                .unit(StandardUnit.NONE)
                .value(data)
                .timestamp(instant)
                .dimensions(dimension)
                .build();

        PutMetricDataRequest request = PutMetricDataRequest.builder()
                .namespace(Namespace)
                .metricData(datum).build();

        System.out.println("Metric put successfully!");

        cw.putMetricData(request);
    }

    public void putAlarm(String name, String value, String Namespace, String MetricName, String statistics,
            Double Threshold) {
        String topicArn = "arn:aws:sns:us-east-1:636018197307:TestTopic";
        List<String> alarmActions = new ArrayList<>();
        alarmActions.add(topicArn);
        Dimension dimension = Dimension.builder()
                .name(name)
                .value(value)
                .build();
        PutMetricAlarmRequest alarmRequest = PutMetricAlarmRequest.builder()
                .alarmActions(alarmActions).alarmDescription("").alarmName("Alarm " + ++alrmId)
                .comparisonOperator(ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD)
                .threshold(Threshold)
                .metricName(MetricName)
                .namespace(Namespace)
                .dimensions(dimension)
                .evaluationPeriods(1)
                .period(60)
                .statistic(statistics)
                .datapointsToAlarm(1)
                .treatMissingData("ignore")
                .build();

        cw.putMetricAlarm(alarmRequest);
    }

}
